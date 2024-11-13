import { getPreferredLanguage } from "~/utils/get-preferred-language";
import { BaseFeature } from "./base-feature";

export type TranslationLanguage = "en" | "ar";
export type PageDirection = "ltr" | "rtl";

interface TranslationFeatureState {
  language: TranslationLanguage;
  direction: PageDirection;
}

export class TranslationFeature extends BaseFeature<TranslationFeatureState> {
  constructor() {
    super({
      language: "en",
      direction: "ltr",
    });
    this.addObserver("language", this.handleLanguageChange.bind(this));
  }

  initLanguage() {
    const storedLanguage = localStorage.getItem(
      "translation_language"
    ) as TranslationLanguage;

    if (storedLanguage) {
      this.update({
        language: storedLanguage,
      });
    } else {
      const preferredLanguage =
        getPreferredLanguage() || this.initialState.language;
      this.update({
        language: preferredLanguage,
      });
    }
  }

  private handleLanguageChange(language: TranslationLanguage) {
    localStorage.setItem("translation_language", language);

    if (language === "ar") {
      document.body.classList.add("rtl");
      document.documentElement.lang = "ar";
      this.update({ direction: "rtl" });
    } else {
      document.body.classList.remove("rtl");
      document.documentElement.lang = language;
      this.update({ direction: "ltr" });
    }
  }
}
