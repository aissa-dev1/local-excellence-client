import Button from "../ui/button";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";
import { service } from "~/service";
import { createResource, Show } from "solid-js";
import SponsorsCarousel from "../reusable/carousel/sponsors";

export default function HomeSponsors() {
  const [sponsors] = createResource(service.sponsor.getSponsors);

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
      <Show when={sponsors()}>
        <SponsorsCarousel
          carouselData={sponsors()!}
          dynamicTheme={true}
          transitionEffect="fade"
        />
      </Show>
    </Spacing.GapY>
  );
}
