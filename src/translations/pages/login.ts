import { TranslationType } from "../types";

interface LoginTranslationType {
  noAccountText: string;
}

export const loginTranslation: TranslationType<LoginTranslationType> = {
  en: {
    noAccountText: "Don't have an account?",
  },
  ar: {
    noAccountText: "ليس لديك حساب؟",
  },
};
