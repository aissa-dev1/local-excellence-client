import { ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "~/utils/cn";
import Container from "./container";
import { A, useLocation } from "@solidjs/router";
import Button from "../ui/button";
import { feature } from "~/feature";
import AppearanceThemeButton from "./appearance-theme-button";
import LanguageSwitchSheet from "./language-switch-sheet";
import Flex from "../ui/flex";
import { useTranslation } from "~/hooks/use-translation";
import { linksTranslation } from "~/translations/reusable/links";

interface NavBarProps extends Omit<ComponentProps<"div">, "children"> {}

export default function NavBar(props: NavBarProps) {
  const [local, rest] = splitProps(props, ["class"]);
  const location = useLocation();
  const translation = useTranslation(linksTranslation);

  return (
    <div
      class={cn(
        "fixed top-0 left-0 w-full flex flex-col justify-center h-16 bg-background shadow-sm shadow-black/10 z-10",
        local.class
      )}
      {...rest}
    >
      <Container class="flex items-center justify-between">
        <A href="/">
          <img
            class="w-12 h-12 rounded-full"
            src="/local-excellence.png"
            alt="Local Excellence"
          />
        </A>
        <Flex gap="sm">
          <Show
            when={
              location.pathname !== "/dashboard" &&
              feature.auth.state().isAuthenticated
            }
          >
            <A href="/dashboard">
              <Button>{translation().dashboard}</Button>
            </A>
          </Show>
          <Show
            when={
              location.pathname !== "/login" &&
              location.pathname !== "/sign-up" &&
              !feature.auth.state().isAuthenticated
            }
          >
            <A href="/sign-up">
              <Button>{translation().signUp}</Button>
            </A>
          </Show>
          <Show
            when={
              location.pathname === "/login" ||
              (location.pathname === "/sign-up" &&
                !feature.auth.state().isAuthenticated)
            }
          >
            <A href="/">
              <Button>{translation().home}</Button>
            </A>
          </Show>
          <LanguageSwitchSheet />
        </Flex>
      </Container>
    </div>
  );
}
