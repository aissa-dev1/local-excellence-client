import { createResource, For, Show } from "solid-js";
import Button from "../ui/button";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";
import HomeStoreCard from "./store-card";
import { A } from "@solidjs/router";
import { service } from "~/service";
import { withTryCatch } from "~/utils/with-try-catch";

export default function HomeStores() {
  const [homeStores] = createResource(async () => {
    const [response, error] = await withTryCatch(service.store.getHomeStores);
    return error ? [] : response;
  });
  const [storesSize] = createResource(async () => {
    const [response, error] = await withTryCatch(service.store.getStoresSize);
    return error ? 0 : response;
  });

  return (
    <Spacing.GapY size="content-lg">
      <Spacing.GapY size="content-sm">
        <Typography.H3>Stores</Typography.H3>
        <Spacing.GapY
          size="content-sm"
          class="md:flex-row md:items-center md:justify-between"
        >
          <Typography.P>
            These are the stores of our valued clients who have subscribed to
            our service.
          </Typography.P>
          <Spacing.GapX size="content-md">
            <Button>Create yours</Button>
            <Show when={homeStores() && homeStores()!.length > 0}>
              <A href="/stores">
                <Button variant="outline">See more ({storesSize()})</Button>
              </A>
            </Show>
          </Spacing.GapX>
        </Spacing.GapY>
      </Spacing.GapY>
      <Show
        when={homeStores() && homeStores()!.length > 0}
        fallback={<Typography.P>No stores to show.</Typography.P>}
      >
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <For each={homeStores()}>{(card) => <HomeStoreCard {...card} />}</For>
        </div>
      </Show>
    </Spacing.GapY>
  );
}
