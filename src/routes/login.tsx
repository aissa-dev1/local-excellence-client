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
import { useLogin } from "~/hooks/auth/use-login";
import { feature } from "~/feature";
import {
  clearStorageAccessToken,
  getStorageAccessToken,
  hasStorageAccessToken,
} from "~/utils/access-token";

export default function Login() {
  const { loginData, setLoginData, login } = useLogin();
  const navigate = useNavigate();

  onMount(() => {
    if (feature.auth.state().isAuthenticated) {
      navigate("/dashboard");
    }
    if (hasStorageAccessToken()) {
      try {
        jwtDecode<JWTUserType & JwtPayload>(getStorageAccessToken()!);
        navigate("/dashboard");
      } catch (error) {
        clearStorageAccessToken();
        navigate("/login");
      }
    } else navigate("/login");
  });

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
        <Spacing.GapY size="content-md" class="mt-12">
          <Input
            type="email"
            placeholder="Email"
            class="px-4 py-2.5"
            value={loginData().email}
            onchange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <Input
            type="password"
            placeholder="Password"
            class="px-4 py-2.5"
            value={loginData().password}
            onchange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <Button class="py-2.5" onClick={login} disabled={loginData().loading}>
            Login
          </Button>
        </Spacing.GapY>
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
