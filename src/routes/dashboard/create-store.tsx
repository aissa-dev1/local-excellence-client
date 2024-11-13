import { createResource, createSignal, Show } from "solid-js";
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
import { CreateStoreData } from "~/services/store";
import { createStoreTranslation } from "~/translations/pages/dashboard/create-store";
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
  const translation = useTranslation(createStoreTranslation);

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
      <DashboardNavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
            <Typography.H1>{translation().title}</Typography.H1>
            <form onSubmit={handleSubmit} class="space-y-4">
              <Flex direction="column" gap="md">
                <Label for="name" class="w-fit">
                  {translation().nameLabel}
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={translation().namePlaceholder}
                  value={store().name}
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
                  value={store().description}
                  onChange={handleChange}
                />
                <Flex direction="column" gap="md">
                  <Label for="type" class="w-fit">
                    {translation().storeTypeSelectLabel}
                  </Label>
                  <Show when={storeTypes()}>
                    <Select
                      id="type"
                      name="type"
                      value={store().type}
                      onChange={handleChange}
                    >
                      <option value="">
                        {translation().storeTypeSelectPlaceholder}
                      </option>
                      {storeTypes()!.map((type) => (
                        <option value={type} class="capitalize ">
                          {type}
                        </option>
                      ))}
                    </Select>
                  </Show>
                </Flex>
              </Flex>
              <Button type="submit">{translation().createStoreBtn}</Button>
            </form>
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </DashboardAuthGuard>
  );
}
