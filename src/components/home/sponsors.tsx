import Button from "../ui/button";
import Typography from "../ui/typography";
import { service } from "~/service";
import { createResource, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import Carousel from "../ui/carousel";
import { withTryCatch } from "~/utils/with-try-catch";
import { feature } from "~/feature";
import Flex from "../ui/flex";
import { useTranslation } from "~/hooks/use-translation";
import { homeTranslation } from "~/translations/pages/home";
import SponsorCard from "./sponsor-card";

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
  const translation = useTranslation(homeTranslation);

  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Typography.H3>{translation().sponsors.title}</Typography.H3>
        <Flex
          direction="column"
          gap="sm"
          class="md:flex-row md:items-center md:justify-between"
        >
          <Typography.P>{translation().sponsors.description}</Typography.P>
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
            <Button class="w-full sm:w-fit">
              {translation().sponsors.makeYoursBtn}
            </Button>
          </A>
        </Flex>
      </Flex>
      <Show
        when={sponsorsWithStores() && sponsorsWithStores()!.length > 0}
        fallback={<Typography.P>No sponsors to show.</Typography.P>}
      >
        <Carousel transitionEffect="fade">
          <For each={sponsorsWithStores()}>
            {(sponsorWithStore) => <SponsorCard {...sponsorWithStore} />}
          </For>
        </Carousel>
      </Show>
    </Flex>
  );
}
