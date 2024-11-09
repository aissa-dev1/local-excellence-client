import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

interface GapYProps extends ComponentProps<"div"> {
  size?: keyof typeof GapYSize;
}

enum GapYSize {
  default = "gap-y-0",
  section = "gap-y-12",
  "content-sm" = "gap-y-2",
  "content-md" = "gap-y-4",
  "content-lg" = "gap-y-6",
}

function GapY(props: GapYProps) {
  const [local, rest] = splitProps(props, ["class", "children", "size"]);

  return (
    <div
      {...rest}
      class={cn(
        "flex flex-col",
        GapYSize[local.size ? local.size : "default"],
        local.class
      )}
    >
      {local.children}
    </div>
  );
}

interface GapXProps extends ComponentProps<"div"> {
  size?: keyof typeof GapXSize;
}

enum GapXSize {
  default = "gap-x-0",
  section = "gap-x-12",
  "content-sm" = "gap-x-2",
  "content-md" = "gap-x-4",
  "content-lg" = "gap-x-6",
}

function GapX(props: GapXProps) {
  const [local, rest] = splitProps(props, ["class", "children", "size"]);

  return (
    <div
      {...rest}
      class={cn(
        "flex flex-row",
        GapXSize[local.size ? local.size : "default"],
        local.class
      )}
    >
      {local.children}
    </div>
  );
}

const Spacing = {
  GapY,
  GapX,
};

export default Spacing;
