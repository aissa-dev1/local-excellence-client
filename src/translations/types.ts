import { TranslationLanguage } from "~/features/translation";

export type TranslationType<T extends Record<string, any>> = {
  [K in TranslationLanguage]: T;
};
