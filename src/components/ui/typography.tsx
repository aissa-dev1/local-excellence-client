import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

function H1(props: ComponentProps<"h1">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <h1
      {...rest}
      class={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        local.class
      )}
    >
      {local.children}
    </h1>
  );
}

function H3(props: ComponentProps<"h3">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <h3
      {...rest}
      class={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        local.class
      )}
    >
      {local.children}
    </h3>
  );
}

function P(props: ComponentProps<"p">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p {...rest} class={cn("leading-7", local.class)}>
      {local.children}
    </p>
  );
}

const Typography = {
  H1,
  H3,
  P,
};

export default Typography;
