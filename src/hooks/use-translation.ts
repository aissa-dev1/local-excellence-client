import { feature } from "~/feature";
import { TranslationType } from "~/translations/types";

export function useTranslation<T extends Record<string, any>>(
  translation: TranslationType<T>
) {
  const language = () => feature.translation.state().language;
  const t = () => translation[language()];
  return t;
}

export function useAdvancedTranslation<T extends Record<string, any>>(
  translations: { [K in keyof T]: TranslationType<T[K]> }[]
) {
  const language = () => feature.translation.state().language;
  const t = <K extends keyof T>(namespace: K) =>
    translations.reduce((acc, { [namespace]: translation }) => {
      return { ...acc, ...translation[language()] };
    }, {} as T[K]);
  return t;
}
