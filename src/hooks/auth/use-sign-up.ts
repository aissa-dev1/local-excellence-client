import { createSignal } from "solid-js";
import { service } from "~/service";
import { AuthSignUpData } from "~/services/auth";
import { useLogin } from "./use-login";
import { withTryCatch } from "~/utils/with-try-catch";
import { feature } from "~/feature";

export function useSignUp() {
  const [signUpData, setSignUpData] = createSignal<
    AuthSignUpData & { loading: boolean }
  >({
    email: "",
    password: "",
    userName: "",
    loading: false,
  });
  const { setLoginData, login } = useLogin();

  async function signUp() {
    if (signUpData().loading) return;

    setSignUpData((prev) => ({ ...prev, loading: true }));
    const [, error] = await withTryCatch(service.auth.signUp, {
      email: signUpData().email,
      password: signUpData().password,
      userName: signUpData().userName,
    });

    if (error) {
      feature.toast.addToast("Sign up failed", error.response.data.message, {
        variant: "error",
      });
      setSignUpData((prev) => ({ ...prev, loading: false }));
      return;
    }

    setLoginData((prev) => ({
      ...prev,
      email: signUpData().email,
      password: signUpData().password,
    }));
    await login();
  }

  return { signUpData, setSignUpData, signUp };
}
