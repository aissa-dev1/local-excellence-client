import { createContext, createSignal, onMount, ParentProps } from "solid-js";
import { getPreferredColorScheme } from "~/utils/get-preferred-color-scheme";

export type ColorScheme = "light" | "dark";

export interface ColorSchemeContextType {
  colorScheme: () => ColorScheme;
  updateColorScheme: (cs: ColorScheme) => void;
  toggleColorScheme: () => void;
}

export const ColorSchemeContext = createContext<
  ColorSchemeContextType | undefined
>(undefined);

export function ColorSchemeProvider(props: ParentProps) {
  const [colorScheme, setColorScheme] = createSignal<ColorScheme>("dark");

  function updateColorScheme(cs: ColorScheme) {
    setColorScheme(cs);
    localStorage.setItem("color_scheme", cs);
    handleColorSchemeChange();
  }

  function toggleColorScheme() {
    updateColorScheme(colorScheme() === "dark" ? "light" : "dark");
  }

  function handleColorSchemeChange() {
    if (colorScheme() === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  function initColorScheme() {
    const storedScheme = localStorage.getItem("color_scheme") as ColorScheme;
    if (storedScheme) {
      updateColorScheme(storedScheme);
    } else {
      const preferredScheme = getPreferredColorScheme() || "dark";
      setColorScheme(preferredScheme);
      handleColorSchemeChange();
    }
  }

  onMount(() => {
    initColorScheme();
  });

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        updateColorScheme,
        toggleColorScheme,
      }}
    >
      {props.children}
    </ColorSchemeContext.Provider>
  );
}
