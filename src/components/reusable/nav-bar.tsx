import { ComponentProps, splitProps } from "solid-js";
import { cn } from "~/utils/cn";
import Container from "./container";
import ColorSchemeCard from "./color-scheme-card";

interface NavBarProps extends Omit<ComponentProps<"div">, "children"> {}

export default function NavBar(props: NavBarProps) {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "fixed top-0 left-0 w-full flex flex-col justify-center h-16 shadow-sm shadow-black/10 bg-opacity-25 backdrop-blur-lg backdrop-filter z-10 dark:shadow-white/10",
        props.class
      )}
      {...rest}
    >
      <Container class="flex items-center justify-between">
        <img
          class="w-12 h-12 rounded-full"
          src="/local-excellence.png"
          alt="Local Excellence"
        />
        <ColorSchemeCard />
      </Container>
    </div>
  );
}
