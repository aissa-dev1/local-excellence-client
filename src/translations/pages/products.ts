import { TranslationType } from "../types";

interface ProductsTranslationType {
  header: {
    title: string;
  };
  search: {
    label: string;
    placeholder: string;
    button: string;
  };
  noProductsFound: string;
  loadMoreBtn: string;
}

export const productsTranslation: TranslationType<ProductsTranslationType> = {
  en: {
    header: {
      title: "Explore all our products!",
    },
    search: {
      label: "Search for products",
      placeholder: "Search...",
      button: "Search",
    },
    noProductsFound: "No products found",
    loadMoreBtn: "Load more",
  },
  ar: {
    header: {
      title: "استكشف جميع منتجاتنا!",
    },
    search: {
      label: "ابحث عن منتجات",
      placeholder: "ابحث...",
      button: "ابحث",
    },
    noProductsFound: "لم يتم العثور على منتجات",
    loadMoreBtn: "تحميل المزيد",
  },
};
