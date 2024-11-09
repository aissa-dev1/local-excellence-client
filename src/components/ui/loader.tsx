import { ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

interface LoaderProps extends Omit<ComponentProps<"div">, "children"> {
  childProps?: Omit<ComponentProps<"div">, "children">;
}

export default function Loader(props: LoaderProps) {
  const [local, rest] = splitProps(props, ["class", "childProps"]);
  const [childLocal, childRest] = splitProps(props.childProps ?? {}, ["class"]);

  return (
    <div {...rest} class={cn("relative w-6 h-6", local.class)}>
      <div
        {...childRest}
        class={cn(
          "absolute w-6 h-6 border-4 border-pink-500 rounded-full border-t-transparent animate-spin",
          childLocal.class
        )}
      ></div>
    </div>
  );
}
