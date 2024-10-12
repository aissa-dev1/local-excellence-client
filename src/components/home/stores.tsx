import { createResource, For, Show } from "solid-js";
import Button from "../ui/button";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";
import HomeStoreCard from "./store-card";
import { A } from "@solidjs/router";
import { service } from "~/service";

export default function HomeStores() {
  const [homeStores] = createResource(service.store.getHomeStores);
  const [storesSize] = createResource(service.store.getStoresSize);

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
