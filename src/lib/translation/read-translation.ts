import fs from "fs";
import path from "path";
import { SUPPORTED_LANGUAGES } from "../constants";
import { withTryCatch } from "~/utils/with-try-catch";
import { TranslationLanguage } from "./types";

type Translations = Record<string, string>;

export async function readTranslation(
  lang: TranslationLanguage
): Promise<Translations> {
  "use server";
  if (!Object.values(SUPPORTED_LANGUAGES).includes(lang)) {
    lang = "en";
  }

  const filePath = path.resolve("translations", `${lang}.json`);

  const [response, error] = await withTryCatch(() => {
    return fs.promises.readFile(filePath, "utf-8");
  });

  if (error || !response) {
    console.error(`Error loading translations for language: ${lang}`, error);
    return {};
  }

  return JSON.parse(response) as Translations;
}
