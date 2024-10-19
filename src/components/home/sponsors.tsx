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

export default function HomeSponsors() {
  const [sponsors] = createResource(async () => {
    const [sponsorsResponse, sponsorsError] = await withTryCatch(
      service.sponsor.getSponsors
    );

    if (sponsorsError) {
      return [];
    }

    const sponsorsWithStore = await Promise.all(
      sponsorsResponse!.map(async (sponsor) => {
        const [storeResponse, storeError] = await withTryCatch(
          service.store.getStoreById,
          sponsor.storeId
        );

        return { ...sponsor, store: storeError ? null : storeResponse };
      })
    );
    return sponsorsWithStore;
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
          <Button class="w-full sm:w-fit">Make yours</Button>
        </Spacing.GapY>
      </Spacing.GapY>
      <Show
        when={sponsors() && sponsors()!.length > 0}
        fallback={<Typography.P>No sponsors to show.</Typography.P>}
      >
        <Carousel transitionEffect="fade">
          <For each={sponsors()}>
            {(sponsor, i) => (
              <Card.Self
                class="h-full min-h-[200px]"
                style={{
                  "background-color": sponsor.backgroundColor,
                  color: sponsor.color,
                }}
              >
                <Card.Padded>
                  <Spacing.GapY size="content-md">
                    <Typography.H3>
                      {sponsor.color} {i()}
                    </Typography.H3>
                    <Typography.P>{sponsor.description}</Typography.P>
                    <A
                      href={
                        sponsor.store
                          ? `/stores/${encodeStoreName(sponsor.store.name)}`
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
