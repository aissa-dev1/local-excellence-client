import { A } from "@solidjs/router";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";

export default function StoresHeader() {
  return (
    <Spacing.GapY size="content-sm">
      <Typography.H1>Explore stores near you!</Typography.H1>
      <A href="/" class="w-fit">
        Home
      </A>
    </Spacing.GapY>
  );
}
