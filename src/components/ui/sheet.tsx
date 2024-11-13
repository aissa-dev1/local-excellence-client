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
import { feature } from "~/feature";

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
  const pageDirection = () => feature.translation.state().direction;

  createEffect(() => {
    if (props.open()) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });

  onCleanup(() => {
    if (typeof window === "undefined") return;

    document.body.classList.remove("overflow-hidden");
  });

  return (
    <div
      class={cn(
        "bg-black/25 w-screen h-screen fixed top-0 z-20 transition-opacity duration-150 ease-in-out",
        {
          "pointer-events-none opacity-0": !local.open(),
          "pointer-events-auto opacity-100": local.open(),
          "left-0": pageDirection() === "ltr",
          "right-0": pageDirection() === "rtl",
        }
      )}
      onClick={() => {
        local.setOpen(false);
      }}
    >
      <div
        class={cn(
          "fixed top-0 flex flex-col h-screen w-[75vw] bg-sheet text-sheet-foreground z-20 transform transition-transform duration-300 ease-in-out md:w-[50vw] lg:w-[350px]",
          {
            "-translate-x-full": !local.open() && pageDirection() === "ltr",
            "translate-x-full": !local.open() && pageDirection() === "rtl",
            "translate-x-0": local.open(),
            "left-0": pageDirection() === "ltr",
            "right-0": pageDirection() === "rtl",
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
