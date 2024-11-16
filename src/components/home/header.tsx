import Typography from "../ui/typography";
import { useSmoothScroll } from "~/hooks/use-smooth-scroll";
import Button from "../ui/button";
import Flex from "../ui/flex";
import { usePagesTranslationTree } from "~/hooks/use-translation-tree";

export default function HomeHeader() {
  useSmoothScroll();
  const pagesTranslation = usePagesTranslationTree();

  return (
    <Flex direction="column" gap="lg">
      <Typography.H1>{pagesTranslation()?.home.header.title}</Typography.H1>
      <a href="#home_stores" target="_self" class="w-full sm:w-fit">
        <Button class="w-full">
          {pagesTranslation()?.home.header.discoverBtn}
        </Button>
      </a>
    </Flex>
  );
}
