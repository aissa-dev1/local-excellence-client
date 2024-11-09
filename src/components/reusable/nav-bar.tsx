import { ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "~/utils/cn";
import Container from "./container";
import { A, useLocation } from "@solidjs/router";
import Spacing from "../ui/spacing";
import Button from "../ui/button";
import { feature } from "~/feature";
import AppearanceThemeButton from "./appearance-theme-button";

interface NavBarProps extends Omit<ComponentProps<"div">, "children"> {}

export default function NavBar(props: NavBarProps) {
  const [local, rest] = splitProps(props, ["class"]);
  const location = useLocation();

  return (
    <div
      class={cn(
        "fixed top-0 left-0 w-full flex flex-col justify-center h-16 bg-background shadow-sm shadow-black/10 z-10 dark:shadow-white/10",
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
        <Spacing.GapX size="content-sm">
          <Show
            when={
              location.pathname !== "/dashboard" &&
              feature.auth.state().isAuthenticated
            }
          >
            <A href="/dashboard">
              <Button>Dashboard</Button>
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
              <Button>Sign up</Button>
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
              <Button>Home</Button>
            </A>
          </Show>
          <AppearanceThemeButton />
        </Spacing.GapX>
      </Container>
    </div>
  );
}
