import { A } from "@solidjs/router";
import { createResource, createSignal, For, Show } from "solid-js";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Badge from "~/components/ui/badge";
import Card from "~/components/ui/card";
import Input from "~/components/ui/input";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { service } from "~/service";

export default function Stores() {
  const [stores] = createResource(service.store.getStores);
  const [searchQuery, setSearchQuery] = createSignal("");
  const filteredStores = () => {
    return stores()?.filter((store) => {
      return store.name.toLowerCase().includes(searchQuery().toLowerCase());
    });
  };

  return (
    <>
      <Title.Left>Stores</Title.Left>
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <Spacing.GapY size="content-sm">
              <Typography.H1>Explore stores near you!</Typography.H1>
              <A href="/" class="w-fit">
                Home
              </A>
            </Spacing.GapY>
            <Spacing.GapY size="content-sm">
              <Typography.P>Search for stores</Typography.P>
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery()}
                onInput={(e) => setSearchQuery(e.currentTarget.value)}
              />
            </Spacing.GapY>
            <Show when={stores()}>
              <Spacing.GapY size="content-md">
                <For each={filteredStores()}>
                  {(store) => (
                    <Card.Self class="p-6">
                      <Spacing.GapY size="content-sm">
                        <Card.Title>{store.name}</Card.Title>
                        <Badge class="w-fit">{store.type}</Badge>
                      </Spacing.GapY>
                    </Card.Self>
                  )}
                </For>
              </Spacing.GapY>
            </Show>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
