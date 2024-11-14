import { useNavigate } from "@solidjs/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount } from "solid-js";
import { feature } from "~/feature";
import { JWTUserType } from "~/features/user";
import { useTranslation } from "~/hooks/use-translation";
import { service } from "~/service";
import { toastTranslation } from "~/translations/reusable/toast";
import {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
} from "~/utils/access-token";
import { withTryCatch } from "~/utils/with-try-catch";

export default function SignOut() {
  const navigate = useNavigate();
  const translation = useTranslation(toastTranslation);

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

    const [signOutResponse, signOutError] = await withTryCatch(
      service.auth.signOut
    );

    clearAccessToken();
    feature.auth.update({
      isAuthenticated: false,
    });
    feature.toast.addToast(
      translation().title.auth.signedOut,
      signOutError ? translation().description.auth.signedOut : signOutResponse!
    );
    navigate("/login");
  });

  return <></>;
}
