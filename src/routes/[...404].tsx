import { A } from "@solidjs/router";
import Title from "~/components/reusable/title";
import Flex from "~/components/ui/flex";
import Typography from "~/components/ui/typography";

export default function NotFound() {
  return (
    <>
      <Title.Left>Not Found</Title.Left>
      <div class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[325px]">
        <Flex items="center" justify="center" gap="md">
          <img
            class="w-12"
            src="/local-excellence.png"
            alt="Local Excellence"
          />
          <Typography.H3>Not Found</Typography.H3>
        </Flex>
        <div class="mt-4 text-center">
          <Typography.P>
            Back home?{" "}
            <A href="/">
              <strong>Home</strong>
            </A>
          </Typography.P>
        </div>
      </div>
    </>
  );
}
