import { createEffect, createSignal, For, Show, Suspense } from "solid-js";
import DashboardAuthGuard from "~/components/dashboard/auth-guard";
import DashboardNavBar from "~/components/dashboard/nav-bar";
import HomeProductCard from "~/components/home/product-card";
import SponsorCard from "~/components/home/sponsor-card";
import HomeStoreCard from "~/components/home/store-card";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
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
import { SponsorType } from "~/services/sponsor";
import { StoreType } from "~/services/store";
import { withTryCatch } from "~/utils/with-try-catch";

export default function Dashboard() {
  const [stores, setStores] = createSignal<StoreType[]>([]);
  const [sponsorsWithStores, setSponsorsWithStores] = createSignal<
    (SponsorType & { store: StoreType })[]
  >([]);
  const [products, setProducts] = createSignal<ProductType[]>([]);
  const pagesTranslation = usePagesTranslationTree();
  const reusableTranslation = useReusableTranslationTree();

  createEffect(async () => {
    const [storesResponse, storesError] = await withTryCatch(
      service.store.getStoresByUserId,
      feature.user.state().id
    );
    setStores(storesError ? [] : storesResponse!);
    for (const store of stores()) {
      const [sponsorResponse, sponsorError] = await withTryCatch(
        service.sponsor.getSponsorByStoreId,
        store._id
      );

      if (!sponsorError && sponsorResponse) {
        setSponsorsWithStores((prev) => [
          ...prev,
          {
            ...sponsorResponse!,
            store,
          },
        ]);
      }

      const [productsResponse, productsError] = await withTryCatch(
        service.product.getProductsByStoreId,
        store._id
      );
      setProducts(
        productsError ? [] : (prev) => [...prev, ...productsResponse!]
      );
    }
  });

  return (
    <DashboardAuthGuard>
      <Title.Left>Dashboard</Title.Left>
      <DashboardNavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
            <Typography.H1>
              {pagesTranslation()?.dashboard.greeting}{" "}
              {feature.user.state().userName}!
            </Typography.H1>
            <Flex direction="column" gap="md">
              <Typography.H1>
                {pagesTranslation()?.dashboard.sponsorsSectionTxt}
              </Typography.H1>
              <Suspense fallback={<Loader />}>
                <Show
                  when={sponsorsWithStores().length > 0}
                  fallback={<Typography.P>No sponsors to show</Typography.P>}
                >
                  <For each={sponsorsWithStores()}>
                    {(sponsorWithStore) => (
                      <SponsorCard {...sponsorWithStore} />
                    )}
                  </For>
                </Show>
              </Suspense>
            </Flex>
            <Flex direction="column" gap="md">
              <Typography.H1>
                {reusableTranslation()?.links.stores}
              </Typography.H1>
              <Suspense fallback={<Loader />}>
                <Show
                  when={stores().length > 0}
                  fallback={
                    <Typography.P>
                      {pagesTranslation()?.home.stores.noStoresToShow}
                    </Typography.P>
                  }
                >
                  <For each={stores()}>
                    {(store) => <HomeStoreCard {...store} />}
                  </For>
                </Show>
              </Suspense>
            </Flex>
            <Flex direction="column" gap="md">
              <Typography.H1>
                {reusableTranslation()?.links.products}
              </Typography.H1>
              <Suspense fallback={<Loader />}>
                <Show
                  when={products().length > 0}
                  fallback={
                    <Typography.P>
                      {pagesTranslation()?.home.products.noProductsToShow}
                    </Typography.P>
                  }
                >
                  <For each={products()}>
                    {(product) => <HomeProductCard {...product} />}
                  </For>
                </Show>
              </Suspense>
            </Flex>
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </DashboardAuthGuard>
  );
}
