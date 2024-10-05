import { A } from "@solidjs/router";
import Button from "../ui/button";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";

export default function HomeJoinUs() {
  return (
    <Spacing.GapY size="content-lg">
      <Spacing.GapY size="content-sm">
        <Typography.H3>Join Us Today</Typography.H3>
        <div>
          <Typography.P>
            <strong>Sign up</strong> now to unlock exclusive access to our
            products and deals.
          </Typography.P>
          <Typography.P>
            Already a member? <strong>Log in</strong> and start exploring!
          </Typography.P>
        </div>
      </Spacing.GapY>
      <Spacing.GapX size="content-md">
        <A href="/sign-up">
          <Button>Sign up</Button>
        </A>
        <A href="/login">
          <Button variant="outline">Login</Button>
        </A>
      </Spacing.GapX>
    </Spacing.GapY>
  );
}
