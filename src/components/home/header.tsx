import Button from "../ui/button";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";

export default function HomeHeader() {
  return (
    <Spacing.GapY size="content-lg">
      <Typography.H1>
        Discover Local Excellence: Clothes, Food, Music, and More All in One
        Store!
      </Typography.H1>
      <Button class="w-full sm:w-fit">Discover</Button>
    </Spacing.GapY>
  );
}
