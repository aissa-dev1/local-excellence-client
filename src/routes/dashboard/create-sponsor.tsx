import { createEffect, createSignal } from "solid-js";
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
import { CreateSponsorData } from "~/services/sponsor";
import { StoreType } from "~/services/store";
import { withTryCatch } from "~/utils/with-try-catch";

export default function CreateSponsor() {
  const initialSponsor: CreateSponsorData = {
    storeId: "",
    backgroundColor: "",
    color: "",
    description: "",
  };
  const [sponsor, setSponsor] = createSignal<CreateSponsorData>(initialSponsor);
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
        "Cannot create sponsor",
        error.response.data.message,
        { variant: "error" }
      );
      return;
    }

    setSponsor(initialSponsor);
    feature.toast.addToast("Sponsor created", response!, {
      variant: "success",
    });
  }

  return (
    <DashboardAuthGuard>
      <Title.Self>Dashboard | Create Sponsor</Title.Self>
      <DashboardHeader />
      <main>
        <Container>
          <Spacing.GapY size="section" class="mt-28">
            <Typography.H1>Create Sponsor</Typography.H1>
            <form onSubmit={handleSubmit} class="space-y-4">
              <Spacing.GapY size="content-md">
                <Label for="storeId" class="w-fit">
                  Store:
                </Label>
                <Select
                  id="storeId"
                  name="storeId"
                  value={sponsor().storeId}
                  onChange={handleChange}
                >
                  <option value="">Select a store</option>
                  {stores().map((store) => (
                    <option value={store._id}>{store.name}</option>
                  ))}
                </Select>
              </Spacing.GapY>
              <Spacing.GapY size="content-md">
                <Label for="backgroundColor" class="w-fit">
                  Background Color:
                </Label>
                <Input
                  type="color"
                  id="backgroundColor"
                  name="backgroundColor"
                  value={sponsor().backgroundColor}
                  onChange={handleChange}
                />
              </Spacing.GapY>
              <Spacing.GapY size="content-md">
                <Label for="color" class="w-fit">
                  Color:
                </Label>
                <Input
                  type="color"
                  id="color"
                  name="color"
                  value={sponsor().color}
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
                  value={sponsor().description}
                  onChange={handleChange}
                />
              </Spacing.GapY>
              <Button type="submit">Create Sponsor</Button>
            </form>
          </Spacing.GapY>
        </Container>
      </main>
      <Footer class="mt-12" />
    </DashboardAuthGuard>
  );
}
