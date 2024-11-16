import { createResource, For, Show } from "solid-js";
import { service } from "~/service";
import { withTryCatch } from "~/utils/with-try-catch";
import Typography from "../ui/typography";
import Button from "../ui/button";
import { A } from "@solidjs/router";
import HomeProductCard from "./product-card";
import { feature } from "~/feature";
import Flex from "../ui/flex";
import Grid from "../ui/grid";
import { usePagesTranslationTree } from "~/hooks/use-translation-tree";

export default function HomeProducts() {
  const [homeProducts] = createResource(async () => {
    const [response, error] = await withTryCatch(
      service.product.getHomeProducts
    );
    return error ? [] : response;
  });
  const [productsSize] = createResource(async () => {
    const [response, error] = await withTryCatch(
      service.product.getProductsSize
    );
    return error ? 0 : response;
  });
  const pagesTranslation = usePagesTranslationTree();

  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Typography.H3>{pagesTranslation()?.home.products.title}</Typography.H3>
        <Flex
          direction="column"
          gap="sm"
          class="md:flex-row md:items-center md:justify-between"
        >
          <Typography.P>
            {pagesTranslation()?.home.products.description}
          </Typography.P>
          <Flex gap="md">
            <A
              href={
                feature.auth.state().isAuthenticated
                  ? "/dashboard/create-product"
                  : "/login"
              }
              onClick={() => {
                if (!feature.auth.state().isAuthenticated) {
                  feature.redirect.update({
                    redirectTo: "/dashboard/create-product",
                  });
                }
              }}
            >
              <Button>
                {pagesTranslation()?.home.products.createYoursBtn}
              </Button>
            </A>{" "}
            <Show when={homeProducts() && homeProducts()!.length > 0}>
              <A href="/products">
                <Button variant="outline">
                  {pagesTranslation()?.home.products.seeMoreBtn} (
                  {productsSize()})
                </Button>
              </A>
            </Show>
          </Flex>
        </Flex>
      </Flex>
      <Show
        when={homeProducts() && homeProducts()!.length > 0}
        fallback={
          <Typography.P>
            {pagesTranslation()?.home.products.noProductsToShow}
          </Typography.P>
        }
      >
        <Grid columns="one" gap="md" class="md:grid-cols-2 xl:grid-cols-3">
          <For each={homeProducts()}>
            {(card) => <HomeProductCard {...card} />}
          </For>
        </Grid>
      </Show>
    </Flex>
  );
}
