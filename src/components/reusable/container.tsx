import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

interface ContainerProps extends ComponentProps<"div"> {}

export default function Container(props: ContainerProps) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...rest} class={cn("container", props.class)}>
      {props.children}
    </div>
  );
}
