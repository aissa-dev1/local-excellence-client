import { TranslationType } from "~/translations/types";

interface CreateProductTranslationType {
  title: string;
  storeSelectLabel: string;
  storeSelectPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  priceLabel: string;
  pricePlaceholder: string;
  createProductBtn: string;
}

export const createProductTranslation: TranslationType<CreateProductTranslationType> =
  {
    en: {
      title: "Create Product",
      storeSelectLabel: "Store",
      storeSelectPlaceholder: "Select a store",
      nameLabel: "Name",
      namePlaceholder: "Enter a name",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Enter a description",
      priceLabel: "Price",
      pricePlaceholder: "Enter a price",
      createProductBtn: "Create Product",
    },
    ar: {
      title: "انشاء منتج",
      storeSelectLabel: "المتجر",
      storeSelectPlaceholder: "اختر متجر",
      nameLabel: "الاسم",
      namePlaceholder: "أدخل اسم",
      descriptionLabel: "الوصف",
      descriptionPlaceholder: "أدخل وصف",
      priceLabel: "السعر",
      pricePlaceholder: "أدخل سعر",
      createProductBtn: "انشاء منتج",
    },
  };
