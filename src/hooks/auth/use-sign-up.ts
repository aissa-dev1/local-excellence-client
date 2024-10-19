import { createSignal } from "solid-js";
import { service } from "~/service";
import { AuthSignUpData } from "~/services/auth";
import { useToast } from "../use-toast";
import { useLogin } from "./use-login";
import { withTryCatch } from "~/utils/with-try-catch";

interface UseSignUpData extends AuthSignUpData {
  loading: boolean;
}

export function useSignUp() {
  const [signUpdata, setSignUpData] = createSignal<UseSignUpData>({
    email: "",
    password: "",
    userName: "",
    loading: false,
  });
  const { setLoginData, login } = useLogin();
  const { addToast } = useToast();

  async function signUp() {
    if (signUpdata().loading) return;

    setSignUpData((prev) => ({ ...prev, loading: true }));
    const [response, error] = await withTryCatch(service.auth.signUp, {
      email: signUpdata().email,
      password: signUpdata().password,
      userName: signUpdata().userName,
    });

    if (error) {
      addToast(error.response.data.message, {
        variant: "destructive",
      });
      setSignUpData((prev) => ({ ...prev, loading: false }));
      return;
    }

    setLoginData((prev) => ({
      ...prev,
      email: signUpdata().email,
      password: signUpdata().password,
    }));
    await login();
  }

  return { signUpdata, setSignUpData, signUp };
}
