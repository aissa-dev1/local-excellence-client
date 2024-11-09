import { jwtDecode, JwtPayload } from "jwt-decode";
import { onMount } from "solid-js";
import HomeHeader from "~/components/home/header";
import HomeJoinUs from "~/components/home/join-us";
import HomeProducts from "~/components/home/products";
import HomeSponsors from "~/components/home/sponsors";
import HomeStores from "~/components/home/stores";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Spacing from "~/components/ui/spacing";
import { feature } from "~/feature";
import { JWTUserType } from "~/features/user";
import {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
} from "~/utils/access-token";
import { withTryCatch } from "~/utils/with-try-catch";

export default function Home() {
  onMount(async () => {
    feature.redirect.update({
      redirectTo: null,
    });
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

  return (
    <>
      <Title.Static />
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <HomeHeader />
            <HomeSponsors />
            <HomeStores />
            <HomeProducts />
            <HomeJoinUs />
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
