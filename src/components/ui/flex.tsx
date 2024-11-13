import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

enum FlexDirection {
  row = "flex-row",
  rowReverse = "flex-row-reverse",
  column = "flex-col",
  columnReverse = "flex-col-reverse",
}

enum FlexJustify {
  start = "justify-start",
  end = "justify-end",
  center = "justify-center",
  between = "justify-between",
  around = "justify-around",
  evenly = "justify-evenly",
}

enum FlexItems {
  start = "items-start",
  end = "items-end",
  center = "items-center",
  baseline = "items-baseline",
  stretch = "items-stretch",
}

enum FlexWrap {
  nowrap = "flex-nowrap",
  wrap = "flex-wrap",
  wrapReverse = "flex-wrap-reverse",
}

enum FlexGap {
  none = "gap-0",
  xs = "gap-1",
  sm = "gap-2",
  md = "gap-4",
  lg = "gap-6",
  xl = "gap-8",
  "2xl" = "gap-12",
}

interface FlexProps extends ComponentProps<"div"> {
  direction?: keyof typeof FlexDirection;
  justify?: keyof typeof FlexJustify;
  items?: keyof typeof FlexItems;
  wrap?: keyof typeof FlexWrap;
  gap?: keyof typeof FlexGap;
}

export default function Flex(props: FlexProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "direction",
    "justify",
    "items",
    "wrap",
    "gap",
  ]);

  const classes = cn(
    "flex",
    local.direction ? FlexDirection[local.direction] : FlexDirection.row,
    local.justify ? FlexJustify[local.justify] : FlexJustify.start,
    local.items ? FlexItems[local.items] : FlexItems.stretch,
    local.wrap ? FlexWrap[local.wrap] : FlexWrap.nowrap,
    local.gap ? FlexGap[local.gap] : FlexGap.none,
    local.class
  );

  return (
    <div {...rest} class={classes}>
      {local.children}
    </div>
  );
}
