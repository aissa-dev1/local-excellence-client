import Button from "../ui/button";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";
import { service } from "~/service";
import { createResource, For, Show } from "solid-js";
import Card from "../ui/card";
import { A } from "@solidjs/router";
import { encodeStoreName } from "~/utils/store-name";
import Carousel from "../ui/carousel";
import { withTryCatch } from "~/utils/with-try-catch";
import { feature } from "~/feature";

export default function HomeSponsors() {
  const [sponsorsWithStores] = createResource(async () => {
    const [sponsorsResponse, sponsorsError] = await withTryCatch(
      service.sponsor.getSponsors
    );

    if (sponsorsError) {
      return [];
    }

    const sponsorWithStoreList = await Promise.all(
      sponsorsResponse!.map(async (sponsor) => {
        const [storeResponse, storeError] = await withTryCatch(
          service.store.getStoreById,
          sponsor.storeId
        );

        return { ...sponsor, store: storeError ? null : storeResponse };
      })
    );
    return sponsorWithStoreList;
  });

  return (
    <Spacing.GapY size="content-lg">
      <Spacing.GapY size="content-sm">
        <Typography.H3>Sponsors</Typography.H3>
        <Spacing.GapY
          size="content-sm"
          class="md:flex-row md:items-center md:justify-between"
        >
          <Typography.P>
            Partner with us to showcase your brand among our top sponsors. Your
            business could be featured here next.
          </Typography.P>
          <A
            href={
              feature.auth.state().isAuthenticated
                ? "/dashboard/create-sponsor"
                : "/login"
            }
            onClick={() => {
              if (!feature.auth.state().isAuthenticated) {
                feature.redirect.update({
                  redirectTo: "/dashboard/create-sponsor",
                });
              }
            }}
          >
            <Button class="w-full sm:w-fit">Make yours</Button>
          </A>
        </Spacing.GapY>
      </Spacing.GapY>
      <Show
        when={sponsorsWithStores() && sponsorsWithStores()!.length > 0}
        fallback={<Typography.P>No sponsors to show.</Typography.P>}
      >
        <Carousel transitionEffect="fade">
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
                      {sponsorWithStore.store?.name}
                    </Typography.H3>
                    <Typography.P>{sponsorWithStore.description}</Typography.P>
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
        </Carousel>
      </Show>
    </Spacing.GapY>
  );
}
