import { A } from "@solidjs/router";
import {
  createSignal,
  For,
  Show,
  onMount,
  Suspense,
  createEffect,
  on,
} from "solid-js";
import HomeStoreCard from "~/components/home/store-card";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import StoresHeader from "~/components/stores/header";
import StoresSearch from "~/components/stores/search";
import Button from "~/components/ui/button";
import Loader from "~/components/ui/loader";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { service } from "~/service";
import { StoreType } from "~/services/store";
import { scrollAllDown } from "~/utils/scroll-all-down";

export default function Stores() {
  const [page, setPage] = createSignal(1);
  const [stores, setStores] = createSignal<StoreType[]>([]);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [searchInputInteraction, setSearchInputInteraction] =
    createSignal(false);

  async function loadStores() {
    const paginatedStores = await service.store.getPaginatedStores(page());
    setStores((prev) => [...prev, ...paginatedStores]);
  }

  async function searchStores(query: string) {
    if (!searchQuery()) return;

    const searchedStores = await service.store.searchStores(query);
    setStores(searchedStores);
  }

  function handleInputChange(
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    setSearchQuery(e.currentTarget.value);
    setSearchInputInteraction(true);
  }

  async function loadMoreStores() {
    setPage(page() + 1);
    await loadStores();
    setTimeout(scrollAllDown, 500);
  }

  onMount(() => {
    loadStores();
  });

  createEffect(
    on([searchQuery, searchInputInteraction], () => {
      if (!searchQuery() && searchInputInteraction()) {
        setPage(1);
        setStores([]);
        loadStores();
      }
    })
  );

  return (
    <>
      <Title.Left>Stores</Title.Left>
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <StoresHeader />
            <StoresSearch
              searchQuery={searchQuery}
              searchStores={searchStores}
              handleInputChange={handleInputChange}
            />
            <Show
              when={stores().length > 0}
              fallback={<Typography.P>No stores to show.</Typography.P>}
            >
              <Suspense fallback={<Loader />}>
                <For each={stores()}>
                  {(store) => <HomeStoreCard {...store} />}
                </For>
              </Suspense>
            </Show>
            <Show when={!searchQuery()}>
              <Button class="w-full lg:w-fit" onClick={loadMoreStores}>
                Load more
              </Button>
            </Show>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
