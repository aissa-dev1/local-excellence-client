import fs from "fs";
import path from "path";
import { withTryCatch } from "~/utils/with-try-catch";
import { TranslationLanguage, TranslationTree } from "./types";

export async function readTranslationTree(
  lang: TranslationLanguage
): Promise<TranslationTree> {
  "use server";
  const filePath = path.resolve("translations-tree", `${lang}.json`);

  const [fileContent, error] = await withTryCatch(() => {
    return fs.promises.readFile(filePath, "utf-8");
  });

  if (error || !fileContent) {
    console.error(
      `Error loading translations tree for language: ${lang}`,
      error
    );
    return {} as TranslationTree;
  }

  return JSON.parse(fileContent) as TranslationTree;
}
