import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

interface ContainerProps extends ComponentProps<"div"> {}

export default function Container(props: ContainerProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...rest} class={cn("container", local.class)}>
      {local.children}
    </div>
  );
}
