import { useNavigate, useParams } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import AuthCheck from "~/components/reusable/auth-check";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Flex from "~/components/ui/flex";
import Typography from "~/components/ui/typography";
import { feature } from "~/feature";
import { useCurrency } from "~/hooks/use-currency";
import { useReusableTranslationTree } from "~/hooks/use-translation-tree";
import { service } from "~/service";
import { ProductType } from "~/services/product";
import { StoreType } from "~/services/store";
import { withTryCatch } from "~/utils/with-try-catch";

export default function Product() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = createSignal<ProductType>({
    _id: "",
    storeId: "",
    name: "",
    description: "",
    price: "",
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
  const currency = useCurrency();
  const reusableTranslation = useReusableTranslationTree();

  onMount(async () => {
    const [productResponse, productError] = await withTryCatch(
      service.product.getProductById,
      params.id
    );

    if (productError) {
      feature.toast.addToast(
        reusableTranslation()?.toast.title.oops,
        productError.response.data.message,
        {
          variant: "error",
        }
      );
      navigate("/products");
      return;
    }

    setProduct(productResponse!);
    const [productStoreResponse, productStoreError] = await withTryCatch(
      service.store.getStoreById,
      product().storeId
    );

    if (productStoreError) {
      feature.toast.addToast(
        reusableTranslation()?.toast.title.oops,
        productStoreError.response.data.message,
        {
          variant: "error",
        }
      );
      navigate("/stores");
      return;
    }

    setProductStore(productStoreResponse!);
  });

  return (
    <AuthCheck>
      <Title.Self>{product().name} | Products</Title.Self>
      <NavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
            <Show when={product()}>
              <Flex direction="column" gap="sm">
                <Typography.H1>{product().name}</Typography.H1>
                <Typography.H3>
                  {product().price} {currency()}
                </Typography.H3>
              </Flex>
            </Show>
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </AuthCheck>
  );
}
