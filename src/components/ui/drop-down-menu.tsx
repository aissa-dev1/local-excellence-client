import { Accessor, ComponentProps, Setter, Show, splitProps } from "solid-js";
import Card from "./card";
import Icon from "../reusable/icon";
import { cn } from "~/utils/cn";

interface DropDownMenuProps extends ComponentProps<"div"> {
  name: string;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
}

function DropDownMenuSelf(props: DropDownMenuProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "name",
    "open",
    "setOpen",
  ]);

  return (
    <div {...rest} class="relative w-full">
      <Card.Self
        class="flex items-center justify-between p-3 cursor-pointer bg-background text-foreground group pointer-events-auto w-full rounded-md border shadow-lg transition-all dark:border-gray-700"
        onClick={() => {
          local.setOpen((prev) => !prev);
        }}
      >
        <Card.Title>{local.name}</Card.Title>
        <Show when={local.open()} fallback={<Icon.ChevronDown />}>
          <Icon.ChevronUp />
        </Show>
      </Card.Self>
      <div
        class={cn(
          "cursor-pointer bg-background text-foreground group w-full rounded-md border shadow-lg transition-all dark:border-gray-700 overflow-hidden",
          {
            "max-h-0 opacity-0 transform -translate-y-2 pointer-events-none":
              !local.open(),
            "max-h-[500px] opacity-100 transform translate-y-2 pointer-events-auto":
              local.open(),
          }
        )}
        style={{
          transition:
            "max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {local.children}
      </div>
    </div>
  );
}

interface DropDownMenuItemProps extends ComponentProps<"div"> {}

function DropDownMenuItem(props: DropDownMenuItemProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...rest}
      class={cn(
        "px-4 py-2 cursor-pointer transition-colors duration-200 text-gray-800 hover:text-white bg-card text-card-foreground hover:bg-dropdown-item-primary",
        local.class
      )}
    >
      {local.children}
    </div>
  );
}

const DropDownMenu = {
  Self: DropDownMenuSelf,
  Item: DropDownMenuItem,
};

export default DropDownMenu;
