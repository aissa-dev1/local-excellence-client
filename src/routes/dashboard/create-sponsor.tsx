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
import {
  useAdvancedTranslation,
  useTranslation,
} from "~/hooks/use-translation";
import { service } from "~/service";
import { CreateSponsorData } from "~/services/sponsor";
import { StoreType } from "~/services/store";
import { createSponsorTranslation } from "~/translations/pages/dashboard/create-sponsor";
import { toastTranslation } from "~/translations/reusable/toast";
import { withTryCatch } from "~/utils/with-try-catch";

export default function CreateSponsor() {
  const initialSponsor: CreateSponsorData = {
    storeId: "",
    backgroundColor: "#00BFFF",
    color: "#ffffff",
    description: "",
  };
  const [sponsor, setSponsor] = createSignal<CreateSponsorData>(initialSponsor);
  const [stores, setStores] = createSignal<StoreType[]>([]);
  const translation = useAdvancedTranslation([
    {
      createSponsor: createSponsorTranslation,
      toast: toastTranslation,
    },
  ]);

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
    setSponsor((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    }
  ) {
    e.preventDefault();
    const [response, error] = await withTryCatch(
      service.sponsor.createSponsor,
      sponsor()
    );

    if (error) {
      feature.toast.addToast(
        translation("toast").title.sponsor.cannotCreate,
        error.response.data.message,
        { variant: "error" }
      );
      return;
    }

    setSponsor(initialSponsor);
    feature.toast.addToast(
      translation("toast").title.sponsor.created,
      response!,
      {
        variant: "success",
      }
    );
  }

  return (
    <DashboardAuthGuard>
      <Title.Self>Dashboard | Create Sponsor</Title.Self>
      <DashboardNavBar />
      <main>
        <Container>
          <Flex direction="column" gap="2xl" class="mt-28">
            <Typography.H1>{translation("createSponsor").title}</Typography.H1>
            <form onSubmit={handleSubmit} class="space-y-4">
              <Flex direction="column" gap="md">
                <Label for="storeId" class="w-fit">
                  {translation("createSponsor").storeSelectLabel}
                </Label>
                <Select
                  id="storeId"
                  name="storeId"
                  value={sponsor().storeId}
                  onChange={handleChange}
                >
                  <option value="">
                    {translation("createSponsor").storeSelectPlaceholder}
                  </option>
                  {stores().map((store) => (
                    <option value={store._id}>{store.name}</option>
                  ))}
                </Select>
              </Flex>
              <Flex direction="column" gap="md">
                <Label for="backgroundColor" class="w-fit">
                  {translation("createSponsor").bgColorLabel}
                </Label>
                <Input
                  type="color"
                  id="backgroundColor"
                  name="backgroundColor"
                  value={sponsor().backgroundColor}
                  onChange={handleChange}
                />
              </Flex>
              <Flex direction="column" gap="md">
                <Label for="color" class="w-fit">
                  {translation("createSponsor").colorLabel}
                </Label>
                <Input
                  type="color"
                  id="color"
                  name="color"
                  value={sponsor().color}
                  onChange={handleChange}
                />
              </Flex>
              <Flex direction="column" gap="md">
                <Label for="description" class="w-fit">
                  {translation("createSponsor").descriptionLabel}
                </Label>
                <TextArea
                  id="description"
                  name="description"
                  placeholder={
                    translation("createSponsor").descriptionPlaceholder
                  }
                  value={sponsor().description}
                  onChange={handleChange}
                />
              </Flex>
              <Button type="submit">
                {translation("createSponsor").createSponsorBtn}
              </Button>
            </form>
          </Flex>
        </Container>
      </main>
      <Footer class="mt-12" />
    </DashboardAuthGuard>
  );
}
