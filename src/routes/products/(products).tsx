import { Params, useSearchParams } from "@solidjs/router";
import {
  createSignal,
  For,
  Show,
  onMount,
  Suspense,
  createEffect,
  on,
  createResource,
} from "solid-js";
import HomeProductCard from "~/components/home/product-card";
import ProductsHeader from "~/components/products/header";
import ProductsSearch from "~/components/products/search";
import AuthCheck from "~/components/reusable/auth-check";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Flex from "~/components/ui/flex";
import Loader from "~/components/ui/loader";
import Typography from "~/components/ui/typography";
import { useTranslation } from "~/hooks/use-translation";
import { service } from "~/service";
import { productsTranslation } from "~/translations/pages/products";
import { scrollAllDown } from "~/utils/scroll-all-down";
import { withTryCatch } from "~/utils/with-try-catch";

interface ProductsSearchParams extends Params {
  query: string;
}

export default function Stores() {
  const [searchParams, setSearchParams] =
    useSearchParams<ProductsSearchParams>();
  const [page, setPage] = createSignal(1);
  const [products, { mutate: setProducts }] = createResource(async () => {
    const [response, error] = await withTryCatch(
      service.product.getPaginatedProducts,
      page()
    );
    return error ? [] : response!;
  });
  const [inputSearchQuery, setInputSearchQuery] = createSignal("");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [searchInputInteraction, setSearchInputInteraction] =
    createSignal(false);
  const translation = useTranslation(productsTranslation);

  async function loadProducts() {
    const [response, error] = await withTryCatch(
      service.product.getPaginatedProducts,
      page()
    );
    setProducts((prev) => (error ? [] : [...prev!, ...response!]));
  }

  async function loadMoreProducts() {
    setPage((prev) => prev + 1);
    await loadProducts();
    setTimeout(scrollAllDown, 500);
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

  async function handleQuerySearchParam() {
    await searchProducts(searchParams.query!);
    setInputSearchQuery(searchParams.query ?? "");
    setSearchQuery(inputSearchQuery());
  }

  onMount(() => {
    if (searchParams.query) {
      handleQuerySearchParam();
    }
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
    <AuthCheck>
      <Title.Left>Products</Title.Left>
      <NavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
            <ProductsHeader />
            <ProductsSearch
              inputSearchQuery={inputSearchQuery}
              searchQuery={searchQuery}
              searchProducts={searchProducts}
              handleInputChange={handleInputChange}
            />
            <Show
              when={products() && products()!.length > 0}
              fallback={
                <Typography.P>{translation().noProductsFound}</Typography.P>
              }
            >
              <Suspense fallback={<Loader />}>
                <For each={products()}>
                  {(store) => <HomeProductCard {...store} />}
                </For>
              </Suspense>
            </Show>
            <Show when={products() && products()!.length > 0 && !searchQuery()}>
              <Button class="w-full lg:w-fit" onClick={loadMoreProducts}>
                {translation().loadMoreBtn}
              </Button>
            </Show>
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </AuthCheck>
  );
}
