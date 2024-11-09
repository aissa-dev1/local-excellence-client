import { A } from "@solidjs/router";
import { createEffect, createSignal, For, Show, Suspense } from "solid-js";
import DashboardAuthGuard from "~/components/dashboard/auth-guard";
import DashboardHeader from "~/components/dashboard/header";
import HomeProductCard from "~/components/home/product-card";
import HomeStoreCard from "~/components/home/store-card";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Card from "~/components/ui/card";
import Loader from "~/components/ui/loader";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { feature } from "~/feature";
import { service } from "~/service";
import { ProductType } from "~/services/product";
import { SponsorType } from "~/services/sponsor";
import { StoreType } from "~/services/store";
import { encodeStoreName } from "~/utils/store-name";
import { withTryCatch } from "~/utils/with-try-catch";

export default function Dashboard() {
  const [stores, setStores] = createSignal<StoreType[]>([]);
  const [sponsorsWithStores, setSponsorsWithStores] = createSignal<
    (SponsorType & { store: StoreType })[]
  >([]);
  const [products, setProducts] = createSignal<ProductType[]>([]);

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
      <DashboardHeader />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <Spacing.GapY size="content-md">
              <Typography.H1>Hi {feature.user.state().userName}!</Typography.H1>
              <A href="/">Home</A>
            </Spacing.GapY>
            <Spacing.GapY size="content-md">
              <Typography.H1>Sponsors</Typography.H1>
              <Suspense fallback={<Loader />}>
                <Show
                  when={sponsorsWithStores().length > 0}
                  fallback={<Typography.P>No sponsors to show</Typography.P>}
                >
                  <For each={sponsorsWithStores()}>
                    {(sponsorWithStore) => (
                      <Card.Self
                        class="h-full min-h-[200px]"
                        style={{
                          "background-color": sponsorWithStore.backgroundColor,
                          color: sponsorWithStore.color,
                        }}
                      >
                        <Card.Padded>
                          <Spacing.GapY size="content-md">
                            <Typography.H3>
                              {sponsorWithStore.store.name}
                            </Typography.H3>
                            <Typography.P>
                              {sponsorWithStore.description}
                            </Typography.P>
                            <A
                              href={
                                sponsorWithStore.store
                                  ? `/stores/${encodeStoreName(
                                      sponsorWithStore.store.name
                                    )}`
                                  : "/stores"
                              }
                              class="w-fit"
                            >
                              <Button>Explore</Button>
                            </A>
                          </Spacing.GapY>
                        </Card.Padded>
                      </Card.Self>
                    )}
                  </For>
                </Show>
              </Suspense>
            </Spacing.GapY>
            <Spacing.GapY size="content-md">
              <Typography.H1>Stores</Typography.H1>
              <Suspense fallback={<Loader />}>
                <Show
                  when={stores().length > 0}
                  fallback={<Typography.P>No stores to show</Typography.P>}
                >
                  <For each={stores()}>
                    {(store) => <HomeStoreCard {...store} />}
                  </For>
                </Show>
              </Suspense>
            </Spacing.GapY>
            <Spacing.GapY size="content-md">
              <Typography.H1>Products</Typography.H1>
              <Suspense fallback={<Loader />}>
                <Show
                  when={products().length > 0}
                  fallback={<Typography.P>No products to show</Typography.P>}
                >
                  <For each={products()}>
                    {(product) => <HomeProductCard {...product} />}
                  </For>
                </Show>
              </Suspense>
            </Spacing.GapY>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </DashboardAuthGuard>
  );
}
