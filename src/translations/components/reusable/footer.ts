import { TranslationType } from "../../types";

interface FooterTranslationType {
  copyright: string;
  rightsReserved: string;
}

export const footerTranslation: TranslationType<FooterTranslationType> = {
  en: {
    copyright: "Copyright ©",
    rightsReserved: "Local Excellence all rights reserved.",
  },
  ar: {
    copyright: "حقوق النشر ©",
    rightsReserved: "جميع الحقوق محفوظة لـ Local Excellence.",
  },
};
