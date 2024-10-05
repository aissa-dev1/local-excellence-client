import { ColorScheme } from "~/components/context-providers/color-scheme-provider";

export function getPreferredColorScheme(): ColorScheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
