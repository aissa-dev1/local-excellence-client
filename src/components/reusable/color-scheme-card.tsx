import { useColorScheme } from "~/hooks/use-color-scheme";
import Icon from "./icon";
import Button from "../ui/button";

export default function ColorSchemeCard() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      variant={colorScheme() === "dark" ? "outline" : "default"}
      size="icon"
      onClick={toggleColorScheme}
    >
      {colorScheme() === "dark" ? <Icon.Moon /> : <Icon.Sun />}
    </Button>
  );
}
