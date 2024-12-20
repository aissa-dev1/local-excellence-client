import { getPreferredLanguage } from "~/utils/get-preferred-language";
import { BaseFeature } from "./base-feature";
import { TranslationTree } from "~/lib/translation/types";
import { readTranslationTree } from "~/lib/translation/read-translation-tree";
import { feature } from "~/feature";

export type TranslationLanguage = "en" | "ar";
export type PageDirection = "ltr" | "rtl";

interface TranslationFeatureState {
  language: TranslationLanguage;
  direction: PageDirection;
  tree: TranslationTree;
}

export class TranslationFeature extends BaseFeature<TranslationFeatureState> {
  constructor() {
    super({
      language: "en",
      direction: "ltr",
      tree: {} as TranslationTree,
    });
    this.addObserver("language", this.handleLanguageChange.bind(this));
  }

  initLanguage() {
    const storedLanguage = localStorage.getItem(
      "translation_language"
    ) as TranslationLanguage;
    const initialLanguage =
      storedLanguage || getPreferredLanguage() || this.initialState.language;
    const initialDirection = initialLanguage === "ar" ? "rtl" : "ltr";

    this.update({
      language: initialLanguage,
      direction: initialDirection,
    });
  }

  private handleLanguageChange(language: TranslationLanguage) {
    localStorage.setItem("translation_language", language);
    document.body.classList.toggle("rtl", language === "ar");
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    this.update({ direction: language === "ar" ? "rtl" : "ltr" });
  }
}
