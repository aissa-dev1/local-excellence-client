import { createResource, createSignal, Show } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";
import DashboardAuthGuard from "~/components/dashboard/auth-guard";
import DashboardHeader from "~/components/dashboard/header";
import Container from "~/components/reusable/container";
import Footer from "~/components/reusable/footer";
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
import { CreateStoreData } from "~/services/store";
import { withTryCatch } from "~/utils/with-try-catch";

export default function CreateStore() {
  const initialStore: CreateStoreData = {
    name: "",
    description: "",
    type: "",
  };
  const [store, setStore] = createSignal<CreateStoreData>(initialStore);
  const [storeTypes] = createResource(async () => {
    const [response, error] = await withTryCatch(service.store.getStoreTypes);
    return error ? [] : response!;
  });

  function handleChange(
    e: Event & {
      currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    }
  ) {
    const { name, value } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    }
  ) {
    e.preventDefault();
    const [response, error] = await withTryCatch(
      service.store.createStore,
      store()
    );

    if (error) {
      feature.toast.addToast(
        "Cannot create store",
        error.response.data.message,
        { variant: "error" }
      );
      return;
    }

    setStore(initialStore);
    feature.toast.addToast("Store created", response!, {
      variant: "success",
    });
  }

  return (
    <DashboardAuthGuard>
      <Title.Self>Dashboard | Create Store</Title.Self>
      <DashboardHeader />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <Typography.H1>Create Store</Typography.H1>
            <form onSubmit={handleSubmit} class="space-y-4">
              <Spacing.GapY size="content-md">
                <Label for="name" class="w-fit">
                  Name:
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter a name..."
                  value={store().name}
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
                  value={store().description}
                  onChange={handleChange}
                />
                <Spacing.GapY size="content-md">
                  <Label for="type" class="w-fit">
                    Store type:
                  </Label>
                  <Show when={storeTypes()}>
                    <Select
                      id="type"
                      name="type"
                      value={store().type}
                      onChange={handleChange}
                    >
                      <option value="">Select a store type</option>
                      {storeTypes()!.map((type) => (
                        <option value={type} class="capitalize">
                          {type}
                        </option>
                      ))}
                    </Select>
                  </Show>
                </Spacing.GapY>
              </Spacing.GapY>
              <Button type="submit">Create Store</Button>
            </form>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </DashboardAuthGuard>
  );
}
