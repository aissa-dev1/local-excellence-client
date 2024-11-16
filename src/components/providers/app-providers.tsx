import { MetaProvider } from "@solidjs/meta";
import { ParentProps } from "solid-js";
import { TranslationProvider } from "./translation-provider";

interface ProvidersProps extends ParentProps {}

export default function AppProviders(props: ProvidersProps) {
  return (
    <MetaProvider>
      <TranslationProvider>{props.children}</TranslationProvider>
    </MetaProvider>
  );
}
