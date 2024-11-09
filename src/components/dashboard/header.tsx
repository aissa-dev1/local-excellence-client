import { ComponentProps, createSignal, For, splitProps } from "solid-js";
import { cn } from "~/utils/cn";
import { A, useLocation } from "@solidjs/router";
import Button from "../ui/button";
import Container from "../reusable/container";
import Icon from "../reusable/icon";
import Spacing from "../ui/spacing";
import AppearanceThemeButton from "../reusable/appearance-theme-button";
import Sheet from "../ui/sheet";
import DropDownMenu from "../ui/drop-down-menu";

interface DashboardHeaderProps
  extends Omit<ComponentProps<"div">, "children"> {}

export default function DashboardHeader(props: DashboardHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);
  const location = useLocation();
  const [navBarOpen, setNavBarOpen] = createSignal(false);
  const [homeDropDownOpen, setHomeDropDownOpen] = createSignal(false);
  const [mineDropDownOpen, setMineDropDownOpen] = createSignal(false);
  const [actionsDropDownOpen, setActionsDropDownOpen] = createSignal(false);
  const [advancedActionsDropDownOpen, setAdvancedActionsDropDownOpen] =
    createSignal(false);

  const dashboardRoutes = [{ name: "Dashboard", path: "/dashboard" }];
  const homeRoutes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Stores",
      path: "/stores",
    },
    {
      name: "Products",
      path: "/products",
    },
  ];
  const mineRoutes = [
    {
      name: "Stores",
      path: "/dashboard/stores",
    },
    {
      name: "Products",
      path: "/dashboard/products",
    },
  ];
  const actionsRoutes = [
    { name: "Create sponsor", path: "/dashboard/create-sponsor" },
    { name: "Create store", path: "/dashboard/create-store" },
    { name: "Create product", path: "/dashboard/create-product" },
  ];
  const advancedActionsRoutes = [{ name: "Sign out", path: "/sign-out" }];

  return (
    <>
      <Sheet name="Dashboard" open={navBarOpen} setOpen={setNavBarOpen}>
        <For each={dashboardRoutes}>
          {(route) => (
            <A
              href={route.path}
              class={`block p-3 rounded-lg transition duration-150 ${
                location.pathname === route.path
                  ? "bg-gray-800"
                  : "hover:bg-gray-700"
              }`}
            >
              {route.name}
            </A>
          )}
        </For>
        <DropDownMenu.Self
          name="Home"
          open={homeDropDownOpen}
          setOpen={setHomeDropDownOpen}
        >
          <For each={homeRoutes}>
            {(route) => (
              <A href={route.path}>
                <DropDownMenu.Item>{route.name}</DropDownMenu.Item>
              </A>
            )}
          </For>
        </DropDownMenu.Self>
        <DropDownMenu.Self
          name="Mine"
          open={mineDropDownOpen}
          setOpen={setMineDropDownOpen}
        >
          <For each={mineRoutes}>
            {(route) => (
              <A href={route.path}>
                <DropDownMenu.Item>{route.name}</DropDownMenu.Item>
              </A>
            )}
          </For>
        </DropDownMenu.Self>
        <DropDownMenu.Self
          name="Actions"
          open={actionsDropDownOpen}
          setOpen={setActionsDropDownOpen}
        >
          <For each={actionsRoutes}>
            {(route) => (
              <A href={route.path}>
                <DropDownMenu.Item>{route.name}</DropDownMenu.Item>
              </A>
            )}
          </For>
        </DropDownMenu.Self>
        <DropDownMenu.Self
          name="Advanced Actions"
          open={advancedActionsDropDownOpen}
          setOpen={setAdvancedActionsDropDownOpen}
        >
          <For each={advancedActionsRoutes}>
            {(route) => (
              <A href={route.path}>
                <DropDownMenu.Item>{route.name}</DropDownMenu.Item>
              </A>
            )}
          </For>
        </DropDownMenu.Self>
      </Sheet>
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
          <Spacing.GapX size="content-md">
            <Button
              onClick={() => {
                setNavBarOpen(true);
              }}
              size="icon"
            >
              <Icon.Slider />
            </Button>
            <AppearanceThemeButton />
          </Spacing.GapX>
        </Container>
      </div>
    </>
  );
}
