import { createEffect, createSignal } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";
import DashboardAuthGuard from "~/components/dashboard/auth-guard";
import DashboardNavBar from "~/components/dashboard/nav-bar";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Flex from "~/components/ui/flex";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import Select from "~/components/ui/select";
import TextArea from "~/components/ui/textarea";
import Typography from "~/components/ui/typography";
import { feature } from "~/feature";
import { useTranslation } from "~/hooks/use-translation";
import { service } from "~/service";
import { CreateProductData } from "~/services/product";
import { StoreType } from "~/services/store";
import { createProductTranslation } from "~/translations/pages/dashboard/create-product";
import { withTryCatch } from "~/utils/with-try-catch";

export default function CreateProduct() {
  const initialProduct: CreateProductData = {
    storeId: "",
    name: "",
    description: "",
    price: "",
  };
  const [product, setProduct] = createSignal<CreateProductData>(initialProduct);
  const [stores, setStores] = createSignal<StoreType[]>([]);
  const translation = useTranslation(createProductTranslation);

  createEffect(async () => {
    const [storesResponse, storesError] = await withTryCatch(
      service.store.getStoresByUserId,
      feature.user.state().id
    );
    setStores(storesError ? [] : storesResponse!);
  });

  function handleChange(
    e: Event & {
      currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    }
  ) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    }
  ) {
    e.preventDefault();
    const productData: CreateProductData = {
      ...product(),
      price: parseFloat(product().price) as unknown as string,
    };
    const [response, error] = await withTryCatch(
      service.product.createProduct,
      productData
    );

    if (error) {
      feature.toast.addToast(
        "Cannot create product",
        error.response.data.message,
        { variant: "error" }
      );
      return;
    }

    setProduct(initialProduct);
    feature.toast.addToast("Product created", response!, {
      variant: "success",
    });
  }

  return (
    <DashboardAuthGuard>
      <Title.Self>Dashboard | Create Product</Title.Self>
      <DashboardNavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
            <Typography.H1>{translation().title}</Typography.H1>
            <form onSubmit={handleSubmit} class="space-y-4">
              <Flex direction="column" gap="md">
                <Label for="storeId" class="w-fit">
                  {translation().storeSelectLabel}
                </Label>
                <Select
                  id="storeId"
                  name="storeId"
                  value={product().storeId}
                  onChange={handleChange}
                >
                  <option value="">
                    {translation().storeSelectPlaceholder}
                  </option>
                  {stores().map((store) => (
                    <option value={store._id}>{store.name}</option>
                  ))}
                </Select>
              </Flex>
              <Flex direction="column" gap="md">
                <Label for="name" class="w-fit">
                  {translation().nameLabel}
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={translation().namePlaceholder}
                  value={product().name}
                  onChange={handleChange}
                />
              </Flex>
              <Flex direction="column" gap="md">
                <Label for="description" class="w-fit">
                  {translation().descriptionLabel}
                </Label>
                <TextArea
                  id="description"
                  name="description"
                  placeholder={translation().descriptionPlaceholder}
                  value={product().description}
                  onChange={handleChange}
                />
              </Flex>
              <Flex direction="column" gap="md">
                <Label for="price" class="w-fit">
                  {translation().priceLabel}
                </Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  placeholder={translation().pricePlaceholder}
                  value={product().price}
                  onChange={handleChange}
                />
              </Flex>
              <Button type="submit">{translation().createProductBtn}</Button>
            </form>
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </DashboardAuthGuard>
  );
}
