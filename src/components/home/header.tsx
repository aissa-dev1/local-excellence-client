import Typography from "../ui/typography";
import { useSmoothScroll } from "~/hooks/use-smooth-scroll";
import Button from "../ui/button";
import { homeTranslation } from "~/translations/pages/home";
import { useTranslation } from "~/hooks/use-translation";
import Flex from "../ui/flex";

export default function HomeHeader() {
  useSmoothScroll();
  const translation = useTranslation(homeTranslation);

  return (
    <Flex direction="column" gap="lg">
      <Typography.H1>{translation().header.title}</Typography.H1>
      <a href="#home_stores" target="_self" class="w-full sm:w-fit">
        <Button class="w-full">{translation().header.discoverBtn}</Button>
      </a>
    </Flex>
  );
}
