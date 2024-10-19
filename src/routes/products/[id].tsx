import { A, useNavigate, useParams } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { CURRENCY } from "~/constants";
import { service } from "~/service";
import { ProductType } from "~/services/product";
import { StoreType } from "~/services/store";
import { encodeStoreName } from "~/utils/store-name";
import { withTryCatch } from "~/utils/with-try-catch";

export default function Product() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = createSignal<ProductType>({
    _id: "",
    storeId: "",
    name: "",
    description: "",
    price: 0,
    createdAt: 0,
  });
  const [productStore, setProductStore] = createSignal<StoreType>({
    _id: "",
    userId: "",
    name: "",
    description: "",
    type: "",
    createdAt: 0,
  });

  onMount(async () => {
    const [productResponse, productError] = await withTryCatch(
      service.product.getProductById,
      params.id
    );

    if (productError) {
      navigate("/products");
      return;
    }

    setProduct(productResponse!);
    const [productStoreResponse, productStoreError] = await withTryCatch(
      service.store.getStoreById,
      product().storeId
    );

    if (productStoreError) {
      navigate("/stores");
      return;
    }

    setProductStore(productStoreResponse!);
  });

  return (
    <>
      <Title.Self>{product().name} | Products</Title.Self>
      <NavBar />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <Show when={product()}>
              <Spacing.GapY size="content-sm">
                <Typography.H1>{product().name}</Typography.H1>
                <Typography.H3>
                  {product().price} {CURRENCY.DZD}
                </Typography.H3>
              </Spacing.GapY>
            </Show>
            <Spacing.GapX size="content-md">
              <A href={`/stores/${encodeStoreName(productStore().name)}`}>
                Store
              </A>
              <A href="/products">Products</A>
              <A href="/">Home</A>
            </Spacing.GapX>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </>
  );
}
