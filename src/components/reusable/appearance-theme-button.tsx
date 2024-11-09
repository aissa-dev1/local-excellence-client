import { feature } from "~/feature";
import Button from "../ui/button";
import Icon from "./icon";

export default function AppearanceThemeButton() {
  const theme = () => feature.appearance.state().theme;

  return (
    <Button
      variant={theme() === "dark" ? "outline" : "default"}
      size="icon"
      onClick={() => {
        feature.appearance.update({
          theme: theme() === "dark" ? "light" : "dark",
        });
      }}
    >
      {theme() === "dark" ? <Icon.Moon /> : <Icon.Sun />}
    </Button>
  );
}
