import { A, useNavigate, useParams } from "@solidjs/router";
import { createSignal, For, onMount, Show, Suspense } from "solid-js";
import HomeProductCard from "~/components/home/product-card";
import AuthCheck from "~/components/reusable/auth-check";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Flex from "~/components/ui/flex";
import Loader from "~/components/ui/loader";
import Typography from "~/components/ui/typography";
import { feature } from "~/feature";
import {
  usePagesTranslationTree,
  useReusableTranslationTree,
} from "~/hooks/use-translation-tree";
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
  const pagesTranslation = usePagesTranslationTree();
  const reusableTranslation = useReusableTranslationTree();

  onMount(async () => {
    const [storeResponse, storeError] = await withTryCatch(
      service.store.getStoreByName,
      params.name
    );

    if (storeError) {
      feature.toast.addToast(
        reusableTranslation()?.toast.title.oops,
        storeError.response.data.message,
        {
          variant: "error",
        }
      );
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
    <AuthCheck>
      <Title.Self>{store().name} | Stores</Title.Self>
      <NavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
            <Show when={store()}>
              <Flex direction="column" gap="sm">
                <Flex items="center" justify="between">
                  <Typography.H1>{store().name}</Typography.H1>
                  <Typography.H3>{storeUser().userName}</Typography.H3>
                </Flex>
                <Typography.P>{store().description}</Typography.P>
              </Flex>
            </Show>
            <Flex direction="column" gap="sm">
              <Typography.P>
                {reusableTranslation()?.links.products}
              </Typography.P>
              <Show
                when={storeProducts().length > 0}
                fallback={
                  <Typography.P>
                    {store().name} {pagesTranslation()?.store.hasNoProducts}
                  </Typography.P>
                }
              >
                <Suspense fallback={<Loader />}>
                  <For each={storeProducts()}>
                    {(store) => <HomeProductCard {...store} />}
                  </For>
                </Suspense>
              </Show>
            </Flex>
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </AuthCheck>
  );
}
