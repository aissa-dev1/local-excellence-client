import { useNavigate } from "@solidjs/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount } from "solid-js";
import { feature } from "~/feature";
import { JWTUserType } from "~/features/user";
import {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
} from "~/utils/access-token";
import { withTryCatch } from "~/utils/with-try-catch";

export default function SignOut() {
  const navigate = useNavigate();

  onMount(async () => {
    if (!hasAccessToken()) {
      navigate("/");
      return;
    }

    const [, error] = await withTryCatch(async () => {
      return jwtDecode<JWTUserType & JwtPayload>(getAccessToken()!);
    });

    if (error) {
      clearAccessToken();
      navigate("/");
      return;
    }

    clearAccessToken();
    feature.auth.update({
      isAuthenticated: false,
    });
    feature.toast.addToast("Logged out", "You have been logged out");
    navigate("/login");
  });

  return <></>;
}
