import { TranslationLanguage } from "~/features/translation";

export function getPreferredLanguage(): TranslationLanguage {
  const userLang = navigator.language;
  return userLang.startsWith("ar") ? "ar" : "en";
}
