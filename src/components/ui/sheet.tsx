import {
  Accessor,
  ComponentProps,
  createEffect,
  onCleanup,
  Setter,
  splitProps,
} from "solid-js";
import { cn } from "~/utils/cn";
import Button from "./button";
import Icon from "../reusable/icon";

interface SheetProps extends ComponentProps<"div"> {
  name: string;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
}

export default function Sheet(props: SheetProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "name",
    "open",
    "setOpen",
  ]);

  createEffect(() => {
    if (props.open()) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });

  onCleanup(() => {
    document.body.classList.remove("overflow-hidden");
  });

  return (
    <div
      class={cn(
        "bg-black/25 w-full h-full fixed top-0 left-0 z-20 transition-opacity duration-150 ease-in-out",
        {
          "pointer-events-none opacity-0": !local.open(),
          "pointer-events-auto opacity-100": local.open(),
        }
      )}
      onClick={() => {
        local.setOpen(false);
      }}
    >
      <div
        class={cn(
          "fixed top-0 left-0 flex flex-col h-screen w-3/4 bg-sheet text-sheet-foreground z-20 transform transition-transform duration-300 ease-in-out md:w-1/2 lg:w-64",
          {
            "-translate-x-full": !local.open(),
            "translate-x-0": local.open(),
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-700">
          <span class="text-xl font-semibold capitalize">{local.name}</span>
          <Button
            class="!bg-sheet-foreground !text-sheet"
            onClick={() => {
              local.setOpen(false);
            }}
            size="icon"
          >
            <Icon.XMark />
          </Button>
        </div>

        <div
          {...rest}
          class={cn("flex-1 overflow-y-auto p-4 space-y-3", local.class)}
        >
          {local.children}
        </div>
      </div>
    </div>
  );
}
