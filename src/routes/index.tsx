import HomeHeader from "~/components/home/header";
import HomeJoinUs from "~/components/home/join-us";
import HomeSponsors from "~/components/home/sponsors";
import HomeStores from "~/components/home/stores";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Spacing from "~/components/ui/spacing";

export default function Home() {
  return (
    <>
      <Title.Self />
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <HomeHeader />
            <HomeSponsors />
            <HomeStores />
            <HomeJoinUs />
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
