import { createEffect, createSignal } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";
import DashboardAuthGuard from "~/components/dashboard/auth-guard";
import DashboardHeader from "~/components/dashboard/header";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
import NavBar from "~/components/reusable/nav-bar";
import Title from "~/components/reusable/title";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import Select from "~/components/ui/select";
import Spacing from "~/components/ui/spacing";
import TextArea from "~/components/ui/textarea";
import Typography from "~/components/ui/typography";
import { feature } from "~/feature";
import { service } from "~/service";
import { CreateProductData } from "~/services/product";
import { StoreType } from "~/services/store";
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
      <DashboardHeader />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <Typography.H1>Create Product</Typography.H1>
            <form onSubmit={handleSubmit} class="space-y-4">
              <Spacing.GapY size="content-md">
                <Label for="storeId" class="w-fit">
                  Store:
                </Label>
                <Select
                  id="storeId"
                  name="storeId"
                  value={product().storeId}
                  onChange={handleChange}
                >
                  <option value="">Select a store</option>
                  {stores().map((store) => (
                    <option value={store._id}>{store.name}</option>
                  ))}
                </Select>
              </Spacing.GapY>
              <Spacing.GapY size="content-md">
                <Label for="name" class="w-fit">
                  Name:
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter a name..."
                  value={product().name}
                  onChange={handleChange}
                />
              </Spacing.GapY>
              <Spacing.GapY size="content-md">
                <Label for="description" class="w-fit">
                  Description:
                </Label>
                <TextArea
                  id="description"
                  name="description"
                  placeholder="Enter a description..."
                  value={product().description}
                  onChange={handleChange}
                />
              </Spacing.GapY>
              <Spacing.GapY size="content-md">
                <Label for="price" class="w-fit">
                  Price:
                </Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter a price..."
                  value={product().price}
                  onChange={handleChange}
                />
              </Spacing.GapY>
              <Button type="submit">Create Product</Button>
            </form>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </DashboardAuthGuard>
  );
}
