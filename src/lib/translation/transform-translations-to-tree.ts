import fs from "fs";
import path from "path";
import { SUPPORTED_LANGUAGES } from "../constants";
import { readTranslation } from "./read-translation";

export async function transformTranslationsToTree() {
  "use server";
  const tree: Record<string, any> = {};

  await fs.promises.mkdir("translations-tree", { recursive: true });

  for (const lang of Object.values(SUPPORTED_LANGUAGES)) {
    const translations = await readTranslation(lang);
    const filePath = path.resolve("translations-tree", `${lang}.json`);

    for (const [key, value] of Object.entries(translations)) {
      const levels = key.split("@").filter(Boolean);

      let currentLevel = tree;

      for (let i = 0; i < levels.length; i++) {
        const level = levels[i];

        if (i === levels.length - 1) {
          currentLevel[level] = value;
        } else {
          currentLevel[level] = currentLevel[level] || {};
          currentLevel = currentLevel[level];
        }
      }
    }

    await fs.promises.writeFile(filePath, JSON.stringify(tree, null, 2));
  }
}
