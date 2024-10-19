import { A, useNavigate, useParams } from "@solidjs/router";
import { createSignal, For, onMount, Show, Suspense } from "solid-js";
import HomeProductCard from "~/components/home/product-card";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Loader from "~/components/ui/loader";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { service } from "~/service";
import { ProductType } from "~/services/product";
import { StoreType } from "~/services/store";
import { UserType } from "~/services/user";
import { withTryCatch } from "~/utils/with-try-catch";

export default function Store() {
  const params = useParams();
  const navigate = useNavigate();
  const [store, setStore] = createSignal<StoreType>({
    _id: "",
    userId: "",
    name: "",
    description: "",
    type: "",
    createdAt: 0,
  });
  const [storeUser, setStoreUser] = createSignal<UserType>({
    _id: "",
    userName: "",
    joinedAt: 0,
  });
  const [storeProducts, setStoreProducts] = createSignal<ProductType[]>([]);

  onMount(async () => {
    const [storeResponse, storeError] = await withTryCatch(
      service.store.getStoreByName,
      params.name
    );

    if (storeError) {
      navigate("/stores");
      return;
    }

    setStore(storeResponse!);
    const [storeUserResponse, storeUserError] = await withTryCatch(
      service.user.getMinimizedUser,
      store().userId
    );

    if (storeUserError) {
      navigate("/stores");
      return;
    }

    const [storeProductsResponse, storeProductsError] = await withTryCatch(
      service.product.getProductsByStoreId,
      store()._id
    );
    setStoreProducts(storeProductsError ? [] : storeProductsResponse!);
    setStoreUser(storeUserResponse!);
  });

  return (
    <>
      <Title.Self>{store().name} | Stores</Title.Self>
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <Show when={store()}>
              <Spacing.GapY size="content-sm">
                <div class="flex items-center justify-between">
                  <Typography.H1>{store().name}</Typography.H1>
                  <Typography.H3>By {storeUser().userName}</Typography.H3>
                </div>
                <Typography.P>{store().description}</Typography.P>
              </Spacing.GapY>
            </Show>
            <Spacing.GapY size="content-sm">
              <Typography.P>Products</Typography.P>
              <Show
                when={storeProducts().length > 0}
                fallback={
                  <Typography.P>{store().name} has no products</Typography.P>
                }
              >
                <Suspense fallback={<Loader />}>
                  <For each={storeProducts()}>
                    {(store) => <HomeProductCard {...store} />}
                  </For>
                </Suspense>
              </Show>
            </Spacing.GapY>
            <Spacing.GapX size="content-md">
              <A href="/stores">Stores</A>
              <A href="/">Home</A>
            </Spacing.GapX>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
