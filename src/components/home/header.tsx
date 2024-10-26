import { createResource, onMount } from "solid-js";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";
import { service } from "~/service";
import { withTryCatch } from "~/utils/with-try-catch";
import { useSmoothScroll } from "~/hooks/use-smooth-scroll";
import Button from "../ui/button";

export default function HomeHeader() {
  useSmoothScroll();
  const [storeTypes] = createResource(async () => {
    const [response, error] = await withTryCatch(service.store.getStoreTypes);
    return error ? [] : response;
  });

  return (
    <Spacing.GapY size="content-lg">
      <Typography.H1>
        Discover Local Excellence:{" "}
        <span class="capitalize">{storeTypes()?.slice(0, 3).join(", ")}</span>,
        and More All in One Store!
      </Typography.H1>
      <a href="#home_stores" target="_self" class="w-full sm:w-fit">
        <Button class="w-full">Discover</Button>
      </a>
    </Spacing.GapY>
  );
}
