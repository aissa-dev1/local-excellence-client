import { ParentProps } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount } from "solid-js";
import { JWTUserType } from "~/features/user";
import { feature } from "~/feature";
import {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
} from "~/utils/access-token";
import { withTryCatch } from "~/utils/with-try-catch";
import { service } from "~/service";
import { useReusableTranslationTree } from "~/hooks/use-translation-tree";

interface DashboardAuthGuard extends ParentProps {}

export default function DashboardAuthGuard(props: DashboardAuthGuard) {
  const navigate = useNavigate();
  const reusableTranslation = useReusableTranslationTree();

  onMount(async () => {
    feature.redirect.update({
      redirectTo: null,
    });
    if (!hasAccessToken()) {
      navigate("/");
      return;
    }

    const [decodedUser, error] = await withTryCatch(async () => {
      return jwtDecode<JWTUserType & JwtPayload>(getAccessToken()!);
    });

    if (error) {
      clearAccessToken();
      navigate("/");
      return;
    }
    if (Date.now() / 1000 >= decodedUser!.exp!) {
      await withTryCatch(async () => {
        return service.auth.signOut();
      });
      feature.toast.addToast(
        reusableTranslation()?.toast.title.auth.signedOut!,
        reusableTranslation()?.toast.description.auth.sessionExpired!,
        {
          variant: "error",
        }
      );
      clearAccessToken();
      navigate("/login");
      return;
    }

    feature.user.update({
      id: decodedUser!.sub,
      email: decodedUser!.email,
      userName: decodedUser!.userName,
      joinedAt: decodedUser!.joinedAt,
    });
    feature.auth.update({
      isAuthenticated: true,
    });
  });

  return <>{props.children}</>;
}
