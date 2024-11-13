import { Params, useSearchParams } from "@solidjs/router";
import {
  createSignal,
  For,
  Show,
  onMount,
  Suspense,
  createEffect,
  on,
  createResource,
} from "solid-js";
import HomeStoreCard from "~/components/home/store-card";
import AuthCheck from "~/components/reusable/auth-check";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import StoresHeader from "~/components/stores/header";
import StoresSearch from "~/components/stores/search";
import Button from "~/components/ui/button";
import Flex from "~/components/ui/flex";
import Loader from "~/components/ui/loader";
import Typography from "~/components/ui/typography";
import { useTranslation } from "~/hooks/use-translation";
import { service } from "~/service";
import { storesTranslation } from "~/translations/pages/stores";
import { scrollAllDown } from "~/utils/scroll-all-down";
import { withTryCatch } from "~/utils/with-try-catch";

interface StoresSearchParams extends Params {
  query: string;
  type: string;
}

export default function Stores() {
  const [searchParams, setSearchParams] = useSearchParams<StoresSearchParams>();
  const [page, setPage] = createSignal(1);
  const [stores, { mutate: setStores }] = createResource(async () => {
    const [response, error] = await withTryCatch(
      service.store.getPaginatedStores,
      page()
    );
    return error ? [] : response!;
  });
  const [inputSearchQuery, setInputSearchQuery] = createSignal("");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [activeStoreType, setActiveStoreType] = createSignal<string>(
    searchParams.type ?? "all"
  );
  const [searchInputInteraction, setSearchInputInteraction] =
    createSignal(false);
  const filteredStores = () => {
    if (!stores()) return [];

    return stores()!.filter((store) => {
      if (activeStoreType() && activeStoreType() !== "all") {
        return store.type === activeStoreType();
      }
      return true;
    });
  };
  const translation = useTranslation(storesTranslation);

  async function loadStores() {
    const [response, error] = await withTryCatch(
      service.store.getPaginatedStores,
      page()
    );
    setStores((prev) => (error ? [] : [...prev!, ...response!]));
  }

  async function loadMoreStores() {
    setPage((prev) => prev + 1);
    await loadStores();
    setTimeout(scrollAllDown, 500);
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

  async function handleQuerySearchParam() {
    await searchStores(searchParams.query!);
    setInputSearchQuery(searchParams.query ?? "");
    setSearchQuery(inputSearchQuery());
  }

  onMount(() => {
    if (searchParams.query) {
      handleQuerySearchParam();
    }
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
    <AuthCheck>
      <Title.Left>Stores</Title.Left>
      <NavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
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
                <Typography.P>{translation().noStoresFound}</Typography.P>
              }
            >
              <Suspense fallback={<Loader />}>
                <For each={filteredStores()}>
                  {(store) => <HomeStoreCard {...store} />}
                </For>
              </Suspense>
            </Show>
            <Show when={stores() && stores()!.length > 0 && !searchQuery()}>
              <Button class="w-full lg:w-fit" onClick={loadMoreStores}>
                {translation().loadMoreBtn}
              </Button>
            </Show>
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </AuthCheck>
  );
}
