import { ComponentProps, splitProps } from "solid-js";
import Container from "./container";
import { cn } from "~/utils/cn";
import Typography from "../ui/typography";

interface FooterProps extends Omit<ComponentProps<"div">, "children"> {}

export default function Footer(props: FooterProps) {
  const [local, rest] = splitProps(props, ["class"]);
  const publishYear = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <div {...rest} class={cn(local.class)}>
      <Container class="bg-card border border-border text-foreground py-3 px-4 rounded-none sm:rounded-t-md">
        <Typography.P>
          Copyright ©{" "}
          {publishYear === currentYear
            ? publishYear
            : `${publishYear}-${currentYear}`}{" "}
          Local Excellence all rights reserved.
        </Typography.P>
      </Container>
    </div>
  );
}
