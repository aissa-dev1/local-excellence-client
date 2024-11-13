import { A, useNavigate } from "@solidjs/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount } from "solid-js";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
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
import Flex from "~/components/ui/flex";
import { useAdvancedTranslation } from "~/hooks/use-translation";
import { linksTranslation } from "~/translations/reusable/links";
import { authTranslation } from "~/translations/reusable/auth";
import { loginTranslation } from "~/translations/pages/login";

export default function Login() {
  const { loginData, setLoginData, login } = useLogin();
  const navigate = useNavigate();
  const translation = useAdvancedTranslation([
    {
      links: linksTranslation,
      auth: authTranslation,
      login: loginTranslation,
    },
  ]);

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
        <Flex direction="column" items="center" justify="center" gap="lg">
          <img
            class="w-28"
            src="/local-excellence.png"
            alt="Local Excellence"
          />
          <Typography.H3>{translation("links").login}</Typography.H3>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="md" class="mt-12">
            <Input
              type="email"
              name="email"
              placeholder={translation("auth").email}
              value={loginData().email}
              onchange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder={translation("auth").password}
              value={loginData().password}
              onchange={handleChange}
            />
            <Button type="submit" disabled={loginData().loading}>
              {translation("links").login}
            </Button>
          </Flex>
        </form>
        <div class="mt-4 text-center">
          <Typography.P>
            {translation("login").noAccountText}{" "}
            <A href="/sign-up">
              <strong>{translation("links").signUp}</strong>
            </A>
          </Typography.P>
        </div>
      </div>
    </>
  );
}
