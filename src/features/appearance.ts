import { getPreferredColorScheme } from "~/utils/get-preferred-color-scheme";
import { BaseFeature } from "./base-feature";

export type AppearanceTheme = "light" | "dark";

interface AppearanceFeatureState {
  theme: AppearanceTheme;
}

export class AppearanceFeature extends BaseFeature<AppearanceFeatureState> {
  constructor() {
    super({
      theme: "dark",
    });
    this.addObserver("theme", this.handleThemeChange.bind(this));
  }

  initTheme() {
    const storedTheme = localStorage.getItem(
      "appearance_theme"
    ) as AppearanceTheme;

    if (storedTheme) {
      this.update({
        theme: storedTheme,
      });
    } else {
      const preferredTheme =
        getPreferredColorScheme() || this.initialState.theme;
      this.update({
        theme: preferredTheme,
      });
    }
  }

  private handleThemeChange(theme: AppearanceTheme) {
    localStorage.setItem("appearance_theme", theme);

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
}
