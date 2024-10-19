import { createResource, onMount } from "solid-js";
import Button from "../ui/button";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";
import { service } from "~/service";
import { withTryCatch } from "~/utils/with-try-catch";

export default function HomeHeader() {
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
      <Button class="w-full sm:w-fit">Discover</Button>
    </Spacing.GapY>
  );
}
