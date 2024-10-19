import { A, useNavigate } from "@solidjs/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount } from "solid-js";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { JWTUserType } from "~/features/user";
import { useToast } from "~/hooks/use-toast";
import { feature } from "~/feature";
import {
  clearStorageAccessToken,
  getStorageAccessToken,
  hasStorageAccessToken,
} from "~/utils/access-token";

export default function Dashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  onMount(() => {
    if (hasStorageAccessToken()) {
      try {
        const decodedUser = jwtDecode<JWTUserType & JwtPayload>(
          getStorageAccessToken()!
        );

        if (Date.now() / 1000 >= decodedUser.exp!) {
          addToast("Your session has expired", { variant: "destructive" });
          clearStorageAccessToken();
          navigate("/login");
          return;
        }

        feature.user.update({
          id: decodedUser.sub,
          email: decodedUser.email,
          userName: decodedUser.userName,
          joinedAt: decodedUser.joinedAt,
        });
        feature.auth.updateIsAuthenticated(true);
      } catch (error) {
        clearStorageAccessToken();
        navigate("/login");
      }
    } else navigate("/login");
    if (!feature.auth.state().isAuthenticated) {
      navigate("/");
    }
  });

  return (
    <>
      <Title.Left>Dashboard</Title.Left>
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <div>
              <Typography.H1>Dashboard</Typography.H1>
              <Typography.H3>
                Welcome {feature.user.state().userName}
              </Typography.H3>
              <Typography.H3>Id {feature.user.state().id}</Typography.H3>
              <Typography.H3>Email {feature.user.state().email}</Typography.H3>
              <A href="/">Home</A>
              <Button
                onClick={() => {
                  feature.auth.updateIsAuthenticated(false);
                  clearStorageAccessToken();
                  navigate("/login");
                }}
              >
                Sign Out
              </Button>
            </div>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
