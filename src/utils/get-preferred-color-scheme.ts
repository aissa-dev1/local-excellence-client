import { AppearanceTheme } from "~/features/appearance";

export function getPreferredColorScheme(): AppearanceTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
