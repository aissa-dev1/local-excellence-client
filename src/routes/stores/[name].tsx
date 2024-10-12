import { A, useParams } from "@solidjs/router";
import {
  createEffect,
  createResource,
  createSignal,
  on,
  onMount,
  Show,
} from "solid-js";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { service } from "~/service";
import { StoreType } from "~/services/store";
import { UserType } from "~/services/user";

export default function Store() {
  const params = useParams();
  const [store] = createResource(() => {
    return service.store.getStoreByName(params.name);
  });
  const [storeOwner, setStoreOwner] = createSignal<UserType>({} as UserType);

  onMount(async () => {
    const fetchedStoreOwner = await service.user.getUserById(store()!.ownerId);
    setStoreOwner(fetchedStoreOwner);
  });

  return (
    <>
      <Title.Left>Stores</Title.Left>
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <Show when={store()}>
              <Spacing.GapY size="content-sm">
                <Typography.H1>{store()!.name}</Typography.H1>
                <Typography.H3>{storeOwner()!.userName}</Typography.H3>
              </Spacing.GapY>
            </Show>
            <Spacing.GapX size="content-md">
              <A href="/stores">Stores</A>
              <A href="/">Home</A>
            </Spacing.GapX>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
