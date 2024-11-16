import { ComponentProps, createSignal, For, splitProps } from "solid-js";
import { cn } from "~/utils/cn";
import { A, useLocation } from "@solidjs/router";
import Button from "../ui/button";
import Container from "../reusable/container";
import Icon from "../reusable/icon";
import Sheet from "../ui/sheet";
import DropDownMenu from "../ui/drop-down-menu";
import LanguageSwitchSheet from "../reusable/language-switch-sheet";
import Flex from "../ui/flex";
import AppearanceThemeButton from "../reusable/appearance-theme-button";
import {
  useComponentsTranslationTree,
  useReusableTranslationTree,
} from "~/hooks/use-translation-tree";

interface DashboardNavBarProps
  extends Omit<ComponentProps<"div">, "children"> {}

export default function DashboardNavBar(props: DashboardNavBarProps) {
  const [local, rest] = splitProps(props, ["class"]);
  const location = useLocation();
  const [navBarOpen, setNavBarOpen] = createSignal(false);
  const [homeDropDownOpen, setHomeDropDownOpen] = createSignal(false);
  const [mineDropDownOpen, setMineDropDownOpen] = createSignal(false);
  const [actionsDropDownOpen, setActionsDropDownOpen] = createSignal(false);
  const [advancedActionsDropDownOpen, setAdvancedActionsDropDownOpen] =
    createSignal(false);
  const componentsTranslation = useComponentsTranslationTree();
  const reusableTranslation = useReusableTranslationTree();

  const dashboardRoutes = () => [
    {
      name: componentsTranslation()?.dashboard.navBar.sheet.name,
      path: "/dashboard",
    },
  ];
  const homeRoutes = () => [
    {
      name: reusableTranslation()?.links.home,
      path: "/",
    },
    {
      name: reusableTranslation()?.links.stores,
      path: "/stores",
    },
    {
      name: reusableTranslation()?.links.products,
      path: "/products",
    },
  ];
  const mineRoutes = () => [
    {
      name: reusableTranslation()?.links.stores,
      path: "/dashboard/stores",
    },
    {
      name: reusableTranslation()?.links.products,
      path: "/dashboard/products",
    },
  ];
  const actionsRoutes = () => [
    {
      name: reusableTranslation()?.links.createSponsor,
      path: "/dashboard/create-sponsor",
    },
    {
      name: reusableTranslation()?.links.createStore,
      path: "/dashboard/create-store",
    },
    {
      name: reusableTranslation()?.links.createProduct,
      path: "/dashboard/create-product",
    },
  ];
  const advancedActionsRoutes = () => [
    { name: reusableTranslation()?.links.signOut, path: "/sign-out" },
  ];

  return (
    <>
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
          <Button
            onClick={() => {
              setNavBarOpen(true);
            }}
            size="icon"
          >
            <Icon.Slider />
          </Button>
        </Container>
      </div>
      <Sheet
        name={componentsTranslation()?.dashboard.navBar.sheet.name!}
        open={navBarOpen}
        setOpen={setNavBarOpen}
      >
        <For each={dashboardRoutes()}>
          {(route) => (
            <A href={route.path}>
              <DropDownMenu.Item
                class={cn({
                  "bg-main text-main-foreground":
                    location.pathname === route.path,
                })}
              >
                {route.name}
              </DropDownMenu.Item>
            </A>
          )}
        </For>
        <DropDownMenu.Self
          name={reusableTranslation()?.links.home!}
          open={homeDropDownOpen}
          setOpen={setHomeDropDownOpen}
        >
          <For each={homeRoutes()}>
            {(route) => (
              <A href={route.path}>
                <DropDownMenu.Item
                  rounded={false}
                  class={cn({
                    "bg-main text-main-foreground":
                      location.pathname === route.path,
                  })}
                >
                  {route.name}
                </DropDownMenu.Item>
              </A>
            )}
          </For>
        </DropDownMenu.Self>
        <DropDownMenu.Self
          name={componentsTranslation()?.dashboard.navBar.sheet.mineTxt!}
          open={mineDropDownOpen}
          setOpen={setMineDropDownOpen}
        >
          <For each={mineRoutes()}>
            {(route) => (
              <A href={route.path}>
                <DropDownMenu.Item
                  rounded={false}
                  class={cn({
                    "bg-main text-main-foreground":
                      location.pathname === route.path,
                  })}
                >
                  {route.name}
                </DropDownMenu.Item>
              </A>
            )}
          </For>
        </DropDownMenu.Self>
        <DropDownMenu.Self
          name={componentsTranslation()?.dashboard.navBar.sheet.actionsTxt!}
          open={actionsDropDownOpen}
          setOpen={setActionsDropDownOpen}
        >
          <For each={actionsRoutes()}>
            {(route) => (
              <A href={route.path}>
                <DropDownMenu.Item
                  rounded={false}
                  class={cn({
                    "bg-main text-main-foreground":
                      location.pathname === route.path,
                  })}
                >
                  {route.name}
                </DropDownMenu.Item>
              </A>
            )}
          </For>
        </DropDownMenu.Self>
        <DropDownMenu.Self
          name={
            componentsTranslation()?.dashboard.navBar.sheet.advancedActionsTxt!
          }
          open={advancedActionsDropDownOpen}
          setOpen={setAdvancedActionsDropDownOpen}
        >
          <For each={advancedActionsRoutes()}>
            {(route) => (
              <A href={route.path}>
                <DropDownMenu.Item
                  rounded={false}
                  class={cn({
                    "bg-main text-main-foreground":
                      location.pathname === route.path,
                  })}
                >
                  {route.name}
                </DropDownMenu.Item>
              </A>
            )}
          </For>
        </DropDownMenu.Self>
        <Flex items="center" justify="between">
          <AppearanceThemeButton />
          <LanguageSwitchSheet />
        </Flex>
      </Sheet>
    </>
  );
}
