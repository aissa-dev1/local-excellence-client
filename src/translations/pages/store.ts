import { TranslationType } from "../types";

interface StoreTranslationType {
  hasNoProducts: string;
}

export const storeTranslation: TranslationType<StoreTranslationType> = {
  en: {
    hasNoProducts: "has no products",
  },
  ar: {
    hasNoProducts: "ليس لديه منتجات",
  },
};
