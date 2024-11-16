import { A } from "@solidjs/router";
import Button from "../ui/button";
import Typography from "../ui/typography";
import Flex from "../ui/flex";
import {
  usePagesTranslationTree,
  useReusableTranslationTree,
} from "~/hooks/use-translation-tree";

export default function HomeJoinUs() {
  const pagesTranslation = usePagesTranslationTree();
  const reusableTranslation = useReusableTranslationTree();

  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Typography.H3>{pagesTranslation()?.home.joinUs.title}</Typography.H3>
        <div>
          <Typography.P>
            {pagesTranslation()?.home.joinUs.description1}
          </Typography.P>
          <Typography.P>
            {pagesTranslation()?.home.joinUs.description2}
          </Typography.P>
        </div>
      </Flex>
      <Flex gap="md">
        <A href="/sign-up">
          <Button>{reusableTranslation()?.links.signUp}</Button>
        </A>
        <A href="/login">
          <Button variant="outline">
            {reusableTranslation()?.links.login}
          </Button>
        </A>
      </Flex>
    </Flex>
  );
}
