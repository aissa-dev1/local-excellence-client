import { TranslationType } from "../types";

interface LinksTranslationType {
  home: string;
  stores: string;
  products: string;
  dashboard: string;
  createSponsor: string;
  createStore: string;
  createProduct: string;
  signUp: string;
  login: string;
  signOut: string;
  termsOfService: string;
}

export const linksTranslation: TranslationType<LinksTranslationType> = {
  en: {
    home: "Home",
    stores: "Stores",
    products: "Products",
    dashboard: "Dashboard",
    createSponsor: "Create sponsor",
    createStore: "Create store",
    createProduct: "Create product",
    signUp: "Sign up",
    login: "Login",
    signOut: "Sign out",
    termsOfService: "Terms of Service",
  },
  ar: {
    home: "الرئيسية",
    stores: "المتاجر",
    products: "المنتجات",
    dashboard: "لوحة التحكم",
    createSponsor: "انشاء اعلان",
    createStore: "انشاء متجر",
    createProduct: "انشاء منتج",
    signUp: "انشاء حساب",
    login: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    termsOfService: "شروط الخدمة",
  },
};
