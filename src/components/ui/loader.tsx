import { ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

interface LoaderProps extends Omit<ComponentProps<"div">, "children"> {
  childProps?: Omit<ComponentProps<"div">, "children">;
}

export default function Loader(props: LoaderProps) {
  const [, rest] = splitProps(props, ["class", "childProps"]);
  const [, childRest] = splitProps(props.childProps ?? {}, ["class"]);

  return (
    <div {...rest} class={cn("relative w-6 h-6", props.class)}>
      <div
        {...childRest}
        class={cn(
          "absolute w-6 h-6 border-4 border-pink-500 rounded-full border-t-transparent animate-spin",
          props.childProps?.class
        )}
      ></div>
    </div>
  );
}
