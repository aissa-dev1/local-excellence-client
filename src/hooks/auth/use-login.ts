import { createSignal } from "solid-js";
import { service } from "~/service";
import { AuthLoginData } from "~/services/auth";
import { useToast } from "../use-toast";
import { jwtDecode } from "jwt-decode";
import { JWTUserType } from "~/features/user";
import { useNavigate } from "@solidjs/router";
import { setAccessToken } from "~/utils/access-token";
import { feature } from "~/feature";
import { withTryCatch } from "~/utils/with-try-catch";

interface UseLoginData extends AuthLoginData {
  loading: boolean;
}

export function useLogin() {
  const [loginData, setLoginData] = createSignal<UseLoginData>({
    email: "",
    password: "",
    loading: false,
  });
  const { addToast } = useToast();
  const navigate = useNavigate();

  async function login() {
    if (loginData().loading) return;

    setLoginData((prev) => ({ ...prev, loading: true }));
    const [response, error] = await withTryCatch(service.auth.login, {
      email: loginData().email,
      password: loginData().password,
    });

    if (error) {
      addToast(error.response.data.message, { variant: "destructive" });
      setLoginData((prev) => ({ ...prev, loading: false }));
      return;
    }

    addToast(response!.message);
    const decodedUser = jwtDecode<JWTUserType>(response!.accessToken);
    feature.user.update({
      id: decodedUser.sub,
      email: decodedUser.email,
      userName: decodedUser.userName,
      joinedAt: decodedUser.joinedAt,
    });
    setAccessToken(response!.accessToken);
    feature.auth.updateIsAuthenticated(true);
    navigate("/dashboard");
  }

  return { loginData, setLoginData, login };
}
