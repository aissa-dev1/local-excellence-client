import { createResource, For, Show } from "solid-js";
import Button from "../ui/button";
import Typography from "../ui/typography";
import HomeStoreCard from "./store-card";
import { A } from "@solidjs/router";
import { service } from "~/service";
import { withTryCatch } from "~/utils/with-try-catch";
import { feature } from "~/feature";
import Flex from "../ui/flex";
import Grid from "../ui/grid";
import { useTranslation } from "~/hooks/use-translation";
import { homeTranslation } from "~/translations/pages/home";

export default function HomeStores() {
  const [homeStores] = createResource(async () => {
    const [response, error] = await withTryCatch(service.store.getHomeStores);
    return error ? [] : response;
  });
  const [storesSize] = createResource(async () => {
    const [response, error] = await withTryCatch(service.store.getStoresSize);
    return error ? 0 : response;
  });
  const translation = useTranslation(homeTranslation);

  return (
    <Flex direction="column" gap="lg" id="home_stores">
      <Flex direction="column" gap="sm">
        <Typography.H3>{translation().stores.title}</Typography.H3>
        <Flex
          direction="column"
          gap="sm"
          class="md:flex-row md:items-center md:justify-between"
        >
          <Typography.P>{translation().stores.description}</Typography.P>
          <Flex gap="md">
            <A
              href={
                feature.auth.state().isAuthenticated
                  ? "/dashboard/create-store"
                  : "/login"
              }
              onClick={() => {
                if (!feature.auth.state().isAuthenticated) {
                  feature.redirect.update({
                    redirectTo: "/dashboard/create-store",
                  });
                }
              }}
            >
              <Button>{translation().stores.createYoursBtn}</Button>
            </A>
            <Show when={homeStores() && homeStores()!.length > 0}>
              <A href="/stores">
                <Button variant="outline">
                  {translation().stores.seeMoreBtn} ({storesSize()})
                </Button>
              </A>
            </Show>
          </Flex>
        </Flex>
      </Flex>
      <Show
        when={homeStores() && homeStores()!.length > 0}
        fallback={
          <Typography.P>{translation().stores.noStoresToShow}</Typography.P>
        }
      >
        <Grid columns="one" gap="md" class="md:grid-cols-2 xl:grid-cols-3">
          <For each={homeStores()}>{(card) => <HomeStoreCard {...card} />}</For>
        </Grid>
      </Show>
    </Flex>
  );
}
