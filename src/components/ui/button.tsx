import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

enum ButtonVariant {
  default = "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive = "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline = "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary = "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost = "hover:bg-accent hover:text-accent-foreground",
  link = "text-primary underline-offset-4 hover:underline",
}

enum ButtonSize {
  default = "h-9 px-4 py-2",
  sm = "h-8 rounded-md px-3 text-xs",
  lg = "h-10 rounded-md px-8",
  icon = "h-9 w-9",
}

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  rounded?: boolean;
}

export default function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "variant",
    "size",
    "rounded",
  ]);
  const rounded = typeof local.rounded !== "undefined" ? local.rounded : true;

  return (
    <button
      {...rest}
      class={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        ButtonVariant[local.variant ? local.variant : "default"],
        ButtonSize[local.size ? local.size : "default"],
        {
          "rounded-none": !rounded,
        },
        local.class
      )}
    >
      {local.children}
    </button>
  );
}
