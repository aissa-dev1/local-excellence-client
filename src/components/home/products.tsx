import { createResource, For, Show } from "solid-js";
import { service } from "~/service";
import { withTryCatch } from "~/utils/with-try-catch";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";
import Button from "../ui/button";
import { A } from "@solidjs/router";
import HomeProductCard from "./product-card";

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

  return (
    <Spacing.GapY size="content-lg">
      <Spacing.GapY size="content-sm">
        <Typography.H3>Products</Typography.H3>
        <Spacing.GapY
          size="content-sm"
          class="md:flex-row md:items-center md:justify-between"
        >
          <Typography.P>
            These are the products from our valued clients who have subscribed
            to our service.
          </Typography.P>
          <Spacing.GapX size="content-md">
            <Button>Create yours</Button>
            <Show when={homeProducts() && homeProducts()!.length > 0}>
              <A href="/products">
                <Button variant="outline">See more ({productsSize()})</Button>
              </A>
            </Show>
          </Spacing.GapX>
        </Spacing.GapY>
      </Spacing.GapY>
      <Show
        when={homeProducts() && homeProducts()!.length > 0}
        fallback={<Typography.P>No products to show.</Typography.P>}
      >
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <For each={homeProducts()}>
            {(card) => <HomeProductCard {...card} />}
          </For>
        </div>
      </Show>
    </Spacing.GapY>
  );
}
