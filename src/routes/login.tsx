import { A, redirect, useNavigate, useSearchParams } from "@solidjs/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { onCleanup, onMount } from "solid-js";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { JWTUserType } from "~/features/user";
import { useLogin } from "~/hooks/auth/use-login";
import { feature } from "~/feature";
import {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
} from "~/utils/access-token";
import { withTryCatch } from "~/utils/with-try-catch";
import { DOMElement } from "solid-js/jsx-runtime";

export default function Login() {
  const { loginData, setLoginData, login } = useLogin();
  const navigate = useNavigate();

  onMount(async () => {
    if (feature.auth.state().isAuthenticated) {
      navigate("/dashboard");
      return;
    }
    if (!hasAccessToken()) {
      navigate("/login");
      return;
    }

    const [, error] = await withTryCatch(async () => {
      return jwtDecode<JWTUserType & JwtPayload>(getAccessToken()!);
    });

    if (error) {
      clearAccessToken();
      navigate("/login");
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
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    }
  ) {
    e.preventDefault();
    login();
  }

  return (
    <>
      <Title.Right>Login</Title.Right>
      <NavBar />
      <div class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[325px]">
        <Spacing.GapY size="content-lg" class="items-center justify-center">
          <img
            class="w-28"
            src="/local-excellence.png"
            alt="Local Excellence"
          />
          <Typography.H3>Login</Typography.H3>
        </Spacing.GapY>
        <form onSubmit={handleSubmit}>
          <Spacing.GapY size="content-md" class="mt-12">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              class="px-4 py-2.5"
              value={loginData().email}
              onchange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              class="px-4 py-2.5"
              value={loginData().password}
              onchange={handleChange}
            />
            <Button class="py-2.5" type="submit" disabled={loginData().loading}>
              Login
            </Button>
          </Spacing.GapY>
        </form>
        <div class="mt-4 text-center">
          <Typography.P>
            Don't have an account?{" "}
            <A href="/sign-up">
              <strong>Sign up</strong>
            </A>
          </Typography.P>
        </div>
      </div>
    </>
  );
}
