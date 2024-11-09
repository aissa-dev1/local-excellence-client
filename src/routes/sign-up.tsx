import { A, useNavigate } from "@solidjs/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount } from "solid-js";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { JWTUserType } from "~/features/user";
import { useSignUp } from "~/hooks/auth/use-sign-up";
import { feature } from "~/feature";
import {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
} from "~/utils/access-token";
import { withTryCatch } from "~/utils/with-try-catch";
import { DOMElement } from "solid-js/jsx-runtime";

export default function SignUp() {
  const { signUpData, setSignUpData, signUp } = useSignUp();
  const navigate = useNavigate();

  onMount(async () => {
    if (feature.auth.state().isAuthenticated) {
      navigate("/dashboard");
      return;
    }
    if (!hasAccessToken()) {
      navigate("/sign-up");
      return;
    }

    const [, error] = await withTryCatch(async () => {
      return jwtDecode<JWTUserType & JwtPayload>(getAccessToken()!);
    });

    if (error) {
      clearAccessToken();
      navigate("/sign-up");
      return;
    }

    navigate("/dashboard");
  });

  function handleChange(
    e: Event & {
      currentTarget: HTMLInputElement | HTMLTextAreaElement;
      target: HTMLInputElement | HTMLTextAreaElement;
    }
  ) {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    }
  ) {
    e.preventDefault();
    signUp();
  }

  return (
    <>
      <Title.Right>Sign Up</Title.Right>
      <NavBar />
      <div class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[325px]">
        <Spacing.GapY size="content-lg" class="items-center justify-center">
          <img
            class="w-28"
            src="/local-excellence.png"
            alt="Local Excellence"
          />
          <Typography.H3>Sign up</Typography.H3>
        </Spacing.GapY>
        <form onSubmit={handleSubmit}>
          <Spacing.GapY size="content-md" class="mt-12">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              class="px-4 py-2.5"
              value={signUpData().email}
              onchange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              class="px-4 py-2.5"
              value={signUpData().password}
              onchange={handleChange}
            />
            <Input
              type="text"
              name="userName"
              placeholder="Name"
              class="px-4 py-2.5"
              value={signUpData().userName}
              onchange={handleChange}
            />
            <Button
              class="py-2.5"
              type="submit"
              disabled={signUpData().loading}
            >
              Sign up
            </Button>
          </Spacing.GapY>
        </form>
        <Spacing.GapY size="content-md" class="mt-4 text-center">
          <Typography.P>
            By creating an account you agree to our{" "}
            <A href="/terms">
              <strong>Terms of Service</strong>
            </A>
            .
          </Typography.P>
          <Typography.P>
            Already have an account?{" "}
            <A href="/login">
              <strong>Login</strong>
            </A>
          </Typography.P>
        </Spacing.GapY>
      </div>
    </>
  );
}
