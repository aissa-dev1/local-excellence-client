import { A } from "@solidjs/router";
import Button from "../ui/button";
import Typography from "../ui/typography";
import Flex from "../ui/flex";
import { useAdvancedTranslation } from "~/hooks/use-translation";
import { homeTranslation } from "~/translations/pages/home";
import { linksTranslation } from "~/translations/reusable/links";

export default function HomeJoinUs() {
  const translation = useAdvancedTranslation([
    {
      home: homeTranslation,
      links: linksTranslation,
    },
  ]);

  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Typography.H3>{translation("home").joinUs.title}</Typography.H3>
        <div>
          <Typography.P>{translation("home").joinUs.description1}</Typography.P>
          <Typography.P>{translation("home").joinUs.description2}</Typography.P>
        </div>
      </Flex>
      <Flex gap="md">
        <A href="/sign-up">
          <Button>{translation("links").signUp}</Button>
        </A>
        <A href="/login">
          <Button variant="outline">{translation("links").login}</Button>
        </A>
      </Flex>
    </Flex>
  );
}
