import { feature } from "~/feature";
import Button from "../ui/button";
import Icon from "./icon";
import Sheet from "../ui/sheet";
import { createSignal, For, JSX } from "solid-js";
import { cn } from "~/utils/cn";
import { TranslationLanguage } from "~/features/translation";
import { useComponentsTranslationTree } from "~/hooks/use-translation-tree";

interface LanguageSwitchItem {
  code: TranslationLanguage;
  label: string;
  icon: JSX.Element;
}

export default function LanguageSwitchSheet() {
  const languages: LanguageSwitchItem[] = [
    { code: "en", label: "English", icon: <Icon.Language /> },
    { code: "ar", label: "العربية", icon: <Icon.Language /> },
  ];

  const [open, setOpen] = createSignal(false);
  const language = () => feature.translation.state().language;
  const componentsTranslation = useComponentsTranslationTree();

  return (
    <div>
      <Button
        variant="default"
        size="icon"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Icon.Language />
      </Button>
      <Sheet
        name={componentsTranslation()?.reusable.languageSwitchSheet.name!}
        open={open}
        setOpen={setOpen}
      >
        <For each={languages}>
          {(lang) => (
            <Button
              class={cn("w-full flex items-center", {
                "!bg-main !text-main-foreground": language() === lang.code,
                "!bg-white !text-black": language() !== lang.code,
              })}
              onClick={() => {
                if (feature.translation.state().language !== lang.code) {
                  setOpen(false);
                }

                feature.translation.update({ language: lang.code });
              }}
            >
              {lang.icon}
              <span class="ml-2">{lang.label}</span>
            </Button>
          )}
        </For>
      </Sheet>
    </div>
  );
}
