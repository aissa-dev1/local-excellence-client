import { A, useNavigate } from "@solidjs/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount } from "solid-js";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
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
import Flex from "~/components/ui/flex";
import { useAdvancedTranslation } from "~/hooks/use-translation";
import { authTranslation } from "~/translations/reusable/auth";
import { linksTranslation } from "~/translations/reusable/links";
import { signUpTranslation } from "~/translations/pages/sign-up";

export default function SignUp() {
  const { signUpData, setSignUpData, signUp } = useSignUp();
  const navigate = useNavigate();
  const translation = useAdvancedTranslation([
    {
      links: linksTranslation,
      auth: authTranslation,
      signUp: signUpTranslation,
    },
  ]);

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
        <Flex direction="column" items="center" justify="center" gap="lg">
          <img
            class="w-28"
            src="/local-excellence.png"
            alt="Local Excellence"
          />
          <Typography.H3 class="capitalize">
            {translation("links").signUp}
          </Typography.H3>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="md" class="mt-12">
            <Input
              type="email"
              name="email"
              placeholder={translation("auth").email}
              value={signUpData().email}
              onchange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder={translation("auth").password}
              value={signUpData().password}
              onchange={handleChange}
            />
            <Input
              type="text"
              name="userName"
              placeholder={translation("auth").userName}
              value={signUpData().userName}
              onchange={handleChange}
            />
            <Button type="submit" disabled={signUpData().loading}>
              {translation("links").signUp}
            </Button>
          </Flex>
        </form>
        <Flex direction="column" gap="md" class="mt-4 text-center">
          <Typography.P>
            {translation("signUp").agreeText}{" "}
            <A href="/terms">
              <strong>{translation("links").termsOfService}.</strong>
            </A>
          </Typography.P>
          <Typography.P>
            {translation("signUp").haveAccountText}{" "}
            <A href="/login">
              <strong>{translation("links").login}</strong>
            </A>
          </Typography.P>
        </Flex>
      </div>
    </>
  );
}
