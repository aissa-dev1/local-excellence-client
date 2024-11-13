import { TranslationType } from "~/translations/types";

interface CreateSponsorTranslationType {
  title: string;
  storeSelectLabel: string;
  storeSelectPlaceholder: string;
  bgColorLabel: string;
  colorLabel: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  createSponsorBtn: string;
}

export const createSponsorTranslation: TranslationType<CreateSponsorTranslationType> =
  {
    en: {
      title: "Create Sponsor",
      storeSelectLabel: "Store",
      storeSelectPlaceholder: "Select a store",
      bgColorLabel: "Background color",
      colorLabel: "Color",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Enter a description",
      createSponsorBtn: "Create Sponsor",
    },
    ar: {
      title: "انشاء اعلان",
      storeSelectLabel: "المتجر",
      storeSelectPlaceholder: "اختر متجر",
      bgColorLabel: "لون الخلفية",
      colorLabel: "لون",
      descriptionLabel: "الوصف",
      descriptionPlaceholder: "أدخل وصف",
      createSponsorBtn: "انشاء اعلان",
    },
  };
