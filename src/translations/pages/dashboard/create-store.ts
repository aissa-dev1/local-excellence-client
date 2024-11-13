import { TranslationType } from "~/translations/types";

interface CreateStoreTranslationType {
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  storeTypeSelectLabel: string;
  storeTypeSelectPlaceholder: string;
  createStoreBtn: string;
}

export const createStoreTranslation: TranslationType<CreateStoreTranslationType> =
  {
    en: {
      title: "Create Store",
      nameLabel: "Name",
      namePlaceholder: "Enter a name",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Enter a description",
      storeTypeSelectLabel: "Store type",
      storeTypeSelectPlaceholder: "Select a store type",
      createStoreBtn: "Create Store",
    },
    ar: {
      title: "انشاء متجر",
      nameLabel: "الاسم",
      namePlaceholder: "أدخل اسم",
      descriptionLabel: "الوصف",
      descriptionPlaceholder: "أدخل وصف",
      storeTypeSelectLabel: "نوع المتجر",
      storeTypeSelectPlaceholder: "اختر نوع المتجر",
      createStoreBtn: "انشاء متجر",
    },
  };
