import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount, ParentProps } from "solid-js";
import { feature } from "~/feature";
import { JWTUserType } from "~/features/user";
import {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
} from "~/utils/access-token";
import { withTryCatch } from "~/utils/with-try-catch";

interface AuthCheckProps extends ParentProps {}

export default function AuthCheck(props: AuthCheckProps) {
  onMount(async () => {
    if (!hasAccessToken()) return;

    const [, error] = await withTryCatch(async () => {
      return jwtDecode<JWTUserType & JwtPayload>(getAccessToken()!);
    });

    if (error) {
      clearAccessToken();
      feature.auth.update({
        isAuthenticated: false,
      });
      return;
    }

    feature.auth.update({
      isAuthenticated: true,
    });
  });

  return <>{props.children}</>;
}
