import { Title as SolidTitle } from "@solidjs/meta";
import { ComponentProps, splitProps } from "solid-js";

function TitleComponent(props: ComponentProps<"title">) {
  const [, rest] = splitProps(props, ["children"]);

  return <SolidTitle {...rest}>Local Excellence</SolidTitle>;
}

function TitleRightSide(props: ComponentProps<"title">) {
  const [, rest] = splitProps(props, ["children"]);

  return <SolidTitle {...rest}>Local Excellence | {props.children}</SolidTitle>;
}

function TitleLeftSide(props: ComponentProps<"title">) {
  const [, rest] = splitProps(props, ["children"]);

  return <SolidTitle {...rest}>{props.children} | Local Excellence</SolidTitle>;
}

const Title = {
  Self: TitleComponent,
  Right: TitleRightSide,
  Left: TitleLeftSide,
};

export default Title;
