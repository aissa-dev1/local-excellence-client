import { Title as SolidTitle } from "@solidjs/meta";
import { ComponentProps, splitProps } from "solid-js";

function TitleStatic(props: ComponentProps<"title">) {
  const [, rest] = splitProps(props, ["children"]);

  return <SolidTitle {...rest}>Local Excellence</SolidTitle>;
}

function TitleComponent(props: ComponentProps<"title">) {
  const [local, rest] = splitProps(props, ["children"]);

  return <SolidTitle {...rest}>{local.children}</SolidTitle>;
}

function TitleRightSide(props: ComponentProps<"title">) {
  const [local, rest] = splitProps(props, ["children"]);

  return <SolidTitle {...rest}>Local Excellence | {local.children}</SolidTitle>;
}

function TitleLeftSide(props: ComponentProps<"title">) {
  const [local, rest] = splitProps(props, ["children"]);

  return <SolidTitle {...rest}>{local.children} | Local Excellence</SolidTitle>;
}

const Title = {
  Static: TitleStatic,
  Self: TitleComponent,
  Right: TitleRightSide,
  Left: TitleLeftSide,
};

export default Title;
