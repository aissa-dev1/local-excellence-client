import { useContext } from "solid-js";
import {
  ColorSchemeContext,
  ColorSchemeContextType,
} from "~/components/context-providers/color-scheme-provider";

export function useColorScheme(): ColorSchemeContextType {
  const context = useContext(ColorSchemeContext);

  if (!context) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }

  return context;
}
