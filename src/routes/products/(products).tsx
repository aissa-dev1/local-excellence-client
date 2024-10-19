import { Params, useSearchParams } from "@solidjs/router";
import {
  createSignal,
  For,
  Show,
  onMount,
  Suspense,
  createEffect,
  on,
} from "solid-js";
import HomeProductCard from "~/components/home/product-card";
import ProductsHeader from "~/components/products/header";
import ProductsSearch from "~/components/products/search";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Loader from "~/components/ui/loader";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { service } from "~/service";
import { ProductType } from "~/services/product";
import { scrollAllDown } from "~/utils/scroll-all-down";
import { withTryCatch } from "~/utils/with-try-catch";

interface ProductsSearchParams extends Params {
  query: string;
}

export default function Stores() {
  const [searchParams, setSearchParams] =
    useSearchParams<ProductsSearchParams>();
  const [page, setPage] = createSignal(1);
  const [products, setProducts] = createSignal<ProductType[]>([]);
  const [inputSearchQuery, setInputSearchQuery] = createSignal("");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [searchInputInteraction, setSearchInputInteraction] =
    createSignal(false);

  // TODO: keep this but add a resource in the top for getting products in the server
  async function loadProducts() {
    const [response, error] = await withTryCatch(
      service.product.getPaginatedProducts,
      page()
    );
    setProducts((prev) => (error ? [] : [...prev, ...response!]));
  }

  async function searchProducts(query: string) {
    if (!query) return;

    const [response, error] = await withTryCatch(
      service.product.searchProducts,
      query
    );
    setProducts(error ? [] : response!);
    setSearchParams({
      query,
    });
    setSearchQuery(query);
  }

  function handleInputChange(
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    setInputSearchQuery(e.currentTarget.value);
    setSearchInputInteraction(true);
  }

  async function loadMoreProducts() {
    setPage(page() + 1);
    await loadProducts();
    setTimeout(scrollAllDown, 500);
  }

  async function handleQuerySearchParam() {
    await searchProducts(searchParams.query!);
    setInputSearchQuery(searchParams.query ?? "");
    setSearchQuery(inputSearchQuery());
  }

  onMount(() => {
    if (searchParams.query) {
      handleQuerySearchParam();
      return;
    }

    loadProducts();
  });

  createEffect(
    on([inputSearchQuery, searchInputInteraction], () => {
      if (!inputSearchQuery() && searchInputInteraction()) {
        setPage(1);
        setProducts([]);
        loadProducts();
        setSearchParams({
          query: inputSearchQuery(),
        });
        setSearchQuery("");
      }
    })
  );

  return (
    <>
      <Title.Left>Products</Title.Left>
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <ProductsHeader />
            <ProductsSearch
              inputSearchQuery={inputSearchQuery}
              searchQuery={searchQuery}
              searchProducts={searchProducts}
              handleInputChange={handleInputChange}
            />
            <Show
              when={products().length > 0}
              fallback={
                <Typography.P>
                  No products found with query '{searchQuery()}'
                </Typography.P>
              }
            >
              <Suspense fallback={<Loader />}>
                <For each={products()}>
                  {(store) => <HomeProductCard {...store} />}
                </For>
              </Suspense>
            </Show>
            <Show when={products().length > 0 && !searchQuery()}>
              <Button class="w-full lg:w-fit" onClick={loadMoreProducts}>
                Load more
              </Button>
            </Show>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
