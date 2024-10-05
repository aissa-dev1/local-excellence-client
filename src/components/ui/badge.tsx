import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

enum BadgeVariants {
  default = "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
  secondary = "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive = "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
  outline = "text-foreground",
}

export interface BadgeProps extends ComponentProps<"div"> {
  variant?: keyof typeof BadgeVariants;
  rounded?: boolean;
}

export default function Badge(props: BadgeProps) {
  const [, rest] = splitProps(props, [
    "class",
    "children",
    "variant",
    "rounded",
  ]);
  const rounded = typeof props.rounded !== "undefined" ? props.rounded : true;

  return (
    <div
      {...rest}
      class={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        BadgeVariants[props.variant ? props.variant : "default"],
        {
          "rounded-none": !rounded,
        },
        props.class
      )}
    >
      {props.children}
    </div>
  );
}
