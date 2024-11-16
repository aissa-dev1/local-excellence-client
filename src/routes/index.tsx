import { createEffect, onMount } from "solid-js";
import HomeHeader from "~/components/home/header";
import HomeJoinUs from "~/components/home/join-us";
import HomeProducts from "~/components/home/products";
import HomeSponsors from "~/components/home/sponsors";
import HomeStores from "~/components/home/stores";
import AuthCheck from "~/components/reusable/auth-check";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Flex from "~/components/ui/flex";
import { feature } from "~/feature";

export default function Home() {
  onMount(() => {
    feature.redirect.update({
      redirectTo: null,
    });
  });

  return (
    <AuthCheck>
      <Title.Static />
      <NavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
            <HomeHeader />
            <HomeSponsors />
            <HomeStores />
            <HomeProducts />
            <HomeJoinUs />
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </AuthCheck>
  );
}
