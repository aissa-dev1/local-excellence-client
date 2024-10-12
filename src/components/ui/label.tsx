import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

interface LabelProps extends ComponentProps<"label"> {}

export default function Label(props: LabelProps) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <label
      {...rest}
      class={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        props.class
      )}
    >
      {props.children}
    </label>
  );
}
