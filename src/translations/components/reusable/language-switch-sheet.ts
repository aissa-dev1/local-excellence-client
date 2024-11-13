import { TranslationType } from "~/translations/types";

interface LanguageSwitchSheetTranslationType {
  name: string;
}

export const languageSwitchSheetTranslation: TranslationType<LanguageSwitchSheetTranslationType> =
  {
    en: {
      name: "Language",
    },
    ar: {
      name: "اللغة",
    },
  };
