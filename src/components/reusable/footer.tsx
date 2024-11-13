import { ComponentProps, splitProps } from "solid-js";
import Container from "./container";
import { cn } from "~/utils/cn";
import Typography from "../ui/typography";
import { useTranslation } from "~/hooks/use-translation";
import { footerTranslation } from "~/translations/components/reusable/footer";

interface FooterProps extends Omit<ComponentProps<"div">, "children"> {}

export default function Footer(props: FooterProps) {
  const [local, rest] = splitProps(props, ["class"]);
  const publishYear = 2024;
  const currentYear = new Date().getFullYear();
  const translation = useTranslation(footerTranslation);

  return (
    <div {...rest} class={cn(local.class)}>
      <Container class="bg-card border border-border text-foreground py-3 px-4 rounded-none sm:rounded-t-md">
        <Typography.P>
          {translation().copyright}{" "}
          {publishYear === currentYear
            ? publishYear
            : `${publishYear}-${currentYear}`}{" "}
          {translation().rightsReserved}
        </Typography.P>
      </Container>
    </div>
  );
}
