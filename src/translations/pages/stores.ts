import { TranslationType } from "../types";

interface StoresTranslationType {
  header: {
    title: string;
  };
  search: {
    label: string;
    placeholder: string;
    button: string;
  };
  noStoresFound: string;
  loadMoreBtn: string;
}

export const storesTranslation: TranslationType<StoresTranslationType> = {
  en: {
    header: {
      title: "Explore stores near you!",
    },
    search: {
      label: "Search for stores",
      placeholder: "Search...",
      button: "Search",
    },
    noStoresFound: "No stores found",
    loadMoreBtn: "Load more",
  },
  ar: {
    header: {
      title: "استكشف المتاجر القريبة منك!",
    },
    search: {
      label: "ابحث عن المتاجر",
      placeholder: "ابحث...",
      button: "ابحث",
    },
    noStoresFound: "لم يتم العثور على متاجر",
    loadMoreBtn: "تحميل المزيد",
  },
};
