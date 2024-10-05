import { createSignal } from "solid-js";
import { service } from "~/service";
import { AuthLoginData } from "~/services/auth";
import { useToast } from "../use-toast";
import { jwtDecode } from "jwt-decode";
import { JWTUserType } from "~/features/user";
import { useNavigate } from "@solidjs/router";
import { setStorageAccessToken } from "~/utils/access-token";
import { feature } from "~/feature";

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

    try {
      setLoginData((prev) => ({ ...prev, loading: true }));
      const response = await service.auth.login({
        email: loginData().email,
        password: loginData().password,
      });
      addToast(response.message);
      const decodedUser = jwtDecode<JWTUserType>(response.accessToken);
      feature.user.update({
        id: decodedUser.sub,
        email: decodedUser.email,
        userName: decodedUser.userName,
      });
      feature.auth.updateAccessToken(response.accessToken);
      setStorageAccessToken(response.accessToken);
      feature.auth.updateIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error: any) {
      addToast(error.response.data.message, {
        variant: "destructive",
      });
    } finally {
      setLoginData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { loginData, setLoginData, login };
}
