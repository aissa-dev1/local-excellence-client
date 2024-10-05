import { MetaProvider } from "@solidjs/meta";
import { ColorSchemeProvider } from "./color-scheme-provider";
import { ToastProvider } from "./toast-provider";
import { ParentProps } from "solid-js";

export default function ContextProviders(props: ParentProps) {
  return (
    <MetaProvider>
      <ColorSchemeProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </ColorSchemeProvider>
    </MetaProvider>
  );
}
