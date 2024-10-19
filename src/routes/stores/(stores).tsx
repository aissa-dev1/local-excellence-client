import { Params, useSearchParams } from "@solidjs/router";
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
import { withTryCatch } from "~/utils/with-try-catch";

interface StoresSearchParams extends Params {
  query: string;
  type: string;
}

export default function Stores() {
  const [searchParams, setSearchParams] = useSearchParams<StoresSearchParams>();
  const [page, setPage] = createSignal(1);
  const [stores, setStores] = createSignal<StoreType[]>([]);
  const [inputSearchQuery, setInputSearchQuery] = createSignal("");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [activeStoreType, setActiveStoreType] = createSignal<string>(
    searchParams.type ?? "all"
  );
  const [searchInputInteraction, setSearchInputInteraction] =
    createSignal(false);
  const filteredStores = () => {
    return stores().filter((store) => {
      if (activeStoreType() && activeStoreType() !== "all") {
        return store.type === activeStoreType();
      }
      return true;
    });
  };

  // TODO: keep this but add a resource in the top for getting stores in the server
  async function loadStores() {
    const [response, error] = await withTryCatch(
      service.store.getPaginatedStores,
      page()
    );
    setStores((prev) => (error ? [] : [...prev, ...response!]));
  }

  async function searchStores(query: string) {
    if (!query) return;

    const [response, error] = await withTryCatch(
      service.store.searchStores,
      query
    );
    setStores(error ? [] : response!);
    setSearchParams({
      query,
      type: activeStoreType(),
    });
    setSearchQuery(query);
  }

  function handleInputChange(
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    setInputSearchQuery(e.currentTarget.value);
    setSearchInputInteraction(true);
  }

  async function loadMoreStores() {
    setPage(page() + 1);
    await loadStores();
    setTimeout(scrollAllDown, 500);
  }

  async function handleQuerySearchParam() {
    await searchStores(searchParams.query!);
    setInputSearchQuery(searchParams.query ?? "");
    setSearchQuery(inputSearchQuery());
  }

  onMount(() => {
    if (searchParams.query) {
      handleQuerySearchParam();
      return;
    }

    loadStores();
  });

  createEffect(
    on([inputSearchQuery, searchInputInteraction], () => {
      if (!inputSearchQuery() && searchInputInteraction()) {
        setPage(1);
        setStores([]);
        loadStores();
        setSearchParams({
          query: inputSearchQuery(),
        });
        setSearchQuery("");
      }
    })
  );

  createEffect(
    on(activeStoreType, () => {
      setSearchParams({
        query: inputSearchQuery(),
        type: activeStoreType(),
      });
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
              inputSearchQuery={inputSearchQuery}
              searchQuery={searchQuery}
              searchStores={searchStores}
              handleInputChange={handleInputChange}
              activeStoreType={activeStoreType}
              setActiveStoreType={setActiveStoreType}
            />
            <Show
              when={filteredStores().length > 0}
              fallback={
                <Typography.P>
                  No stores found with{" "}
                  {searchQuery() && `query '${searchQuery()}' and`} type '
                  {activeStoreType()}'.
                </Typography.P>
              }
            >
              <Suspense fallback={<Loader />}>
                <For each={filteredStores()}>
                  {(store) => <HomeStoreCard {...store} />}
                </For>
              </Suspense>
            </Show>
            <Show when={stores().length > 0 && !searchQuery()}>
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
