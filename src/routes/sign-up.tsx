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

export default function SignUp() {
  const { signUpdata, setSignUpData, signUp } = useSignUp();
  const navigate = useNavigate();

  onMount(() => {
    if (feature.auth.state().isAuthenticated) {
      navigate("/dashboard");
    }
    if (hasAccessToken()) {
      try {
        jwtDecode<JWTUserType & JwtPayload>(getAccessToken()!);
        navigate("/dashboard");
      } catch (error) {
        clearAccessToken();
        navigate("/sign-up");
      }
    } else navigate("/sign-up");
  });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUp();
          }}
        >
          <Spacing.GapY size="content-md" class="mt-12">
            <Input
              type="email"
              placeholder="Email"
              class="px-4 py-2.5"
              value={signUpdata().email}
              onchange={(e) =>
                setSignUpData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Input
              type="password"
              placeholder="Password"
              class="px-4 py-2.5"
              value={signUpdata().password}
              onchange={(e) =>
                setSignUpData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Input
              type="text"
              placeholder="Name"
              class="px-4 py-2.5"
              value={signUpdata().userName}
              onchange={(e) =>
                setSignUpData((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
            <Button
              class="py-2.5"
              onClick={signUp}
              disabled={signUpdata().loading}
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
