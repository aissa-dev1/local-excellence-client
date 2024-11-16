import { createSignal, onCleanup, onMount } from "solid-js";
import { service } from "~/service";
import { AuthLoginData } from "~/services/auth";
import { jwtDecode } from "jwt-decode";
import { JWTUserType } from "~/features/user";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { setAccessToken } from "~/utils/access-token";
import { feature } from "~/feature";
import { withTryCatch } from "~/utils/with-try-catch";
import { useReusableTranslationTree } from "../use-translation-tree";

export function useLogin() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loginData, setLoginData] = createSignal<
    AuthLoginData & { loading: boolean }
  >({
    email: "",
    password: "",
    loading: false,
  });
  const reusabeleTranslation = useReusableTranslationTree();

  onMount(() => {
    if (feature.redirect.state().redirectTo) {
      setSearchParams({
        redirect: feature.redirect.state().redirectTo,
      });
    }
  });

  onCleanup(() => {
    if (feature.auth.state().isAuthenticated) {
      feature.redirect.update({
        redirectTo: null,
      });
    }
  });

  async function login() {
    if (loginData().loading) return;

    setLoginData((prev) => ({ ...prev, loading: true }));
    const [response, error] = await withTryCatch(service.auth.login, {
      email: loginData().email,
      password: loginData().password,
    });

    if (error) {
      feature.toast.addToast(
        reusabeleTranslation().toast.title.auth.loginFailed,
        error.response.data.message,
        {
          variant: "error",
        }
      );
      setLoginData((prev) => ({ ...prev, loading: false }));
      return;
    }

    feature.toast.addToast(
      reusabeleTranslation().toast.title.auth.loginSuccessful,
      response!.message,
      {
        variant: "success",
      }
    );
    const decodedUser = jwtDecode<JWTUserType>(response!.accessToken);
    feature.user.update({
      id: decodedUser.sub,
      email: decodedUser.email,
      userName: decodedUser.userName,
      joinedAt: decodedUser.joinedAt,
    });
    setAccessToken(response!.accessToken);
    feature.auth.update({
      isAuthenticated: true,
    });
    navigate(searchParams.redirect || "/dashboard");
  }

  return { loginData, setLoginData, login };
}
