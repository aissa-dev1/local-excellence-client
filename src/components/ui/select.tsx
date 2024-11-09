import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

export interface SelectProps extends ComponentProps<"select"> {}

export default function Select(props: SelectProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <select
      {...rest}
      class={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
    >
      {local.children}
    </select>
  );
}
