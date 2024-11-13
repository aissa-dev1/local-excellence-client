import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

enum GridTemplateColumns {
  none = "grid-cols-none",
  one = "grid-cols-1",
  two = "grid-cols-2",
  three = "grid-cols-3",
  four = "grid-cols-4",
  five = "grid-cols-5",
  six = "grid-cols-6",
  seven = "grid-cols-7",
  eight = "grid-cols-8",
  nine = "grid-cols-9",
  ten = "grid-cols-10",
  eleven = "grid-cols-11",
  twelve = "grid-cols-12",
}

enum GridGap {
  none = "gap-0",
  xs = "gap-1",
  sm = "gap-2",
  md = "gap-4",
  lg = "gap-6",
  xl = "gap-8",
  "2xl" = "gap-12",
}

enum GridAlignItems {
  start = "items-start",
  end = "items-end",
  center = "items-center",
  stretch = "items-stretch",
}

enum GridJustifyItems {
  start = "justify-start",
  end = "justify-end",
  center = "justify-center",
  stretch = "justify-stretch",
}

interface GridProps extends ComponentProps<"div"> {
  columns?: keyof typeof GridTemplateColumns;
  gap?: keyof typeof GridGap;
  align?: keyof typeof GridAlignItems;
  justify?: keyof typeof GridJustifyItems;
}

export default function Grid(props: GridProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "columns",
    "gap",
    "align",
    "justify",
  ]);

  const classes = cn(
    "grid",
    local.columns
      ? GridTemplateColumns[local.columns]
      : GridTemplateColumns.none,
    local.gap ? GridGap[local.gap] : GridGap.none,
    local.align ? GridAlignItems[local.align] : GridAlignItems.stretch,
    local.justify ? GridJustifyItems[local.justify] : GridJustifyItems.start,
    local.class
  );

  return (
    <div {...rest} class={classes}>
      {local.children}
    </div>
  );
}
