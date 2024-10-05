import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

function CardComponent(props: ComponentProps<"div">) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...rest}
      class={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow",
        props.class
      )}
    >
      {props.children}
    </div>
  );
}

function CardHeader(props: ComponentProps<"div">) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...rest} class={cn("flex flex-col space-y-1.5 p-6", props.class)}>
      {props.children}
    </div>
  );
}

function CardTitle(props: ComponentProps<"h3">) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <h3
      {...rest}
      class={cn("font-semibold leading-none tracking-tight", props.class)}
    >
      {props.children}
    </h3>
  );
}

function CardDescription(props: ComponentProps<"p">) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <p {...rest} class={cn("text-sm text-muted-foreground", props.class)}>
      {props.children}
    </p>
  );
}

function CardContent(props: ComponentProps<"div">) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...rest} class={cn("p-6 pt-0", props.class)}>
      {props.children}
    </div>
  );
}

function CardFooter(props: ComponentProps<"div">) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...rest} class={cn("flex items-center p-6 pt-0", props.class)}>
      {props.children}
    </div>
  );
}

const Card = {
  Self: CardComponent,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
};

export default Card;
