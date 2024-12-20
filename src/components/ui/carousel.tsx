import { children, ParentProps, ResolvedJSXElement, Show } from "solid-js";
import { createSignal, onCleanup, onMount } from "solid-js";
import Button from "~/components/ui/button";
import Typography from "~/components/ui/typography";
import { cn } from "~/utils/cn";
import { clientOnly } from "@solidjs/start";
import Flex from "./flex";
import Icon from "../reusable/icon";
import { feature } from "~/feature";

interface CarouselProps extends ParentProps {
  autoPlay?: boolean;
  moveDurationSeconds?: number;
  pauseOnMouseEnter?: boolean;
  transitionEffect?: keyof typeof CarouselTransitionEffect;
}

enum CarouselTransitionEffect {
  default = "animate-carousal-default",
  fade = "animate-carousal-fade",
  slide = "animate-carousal-slide",
  zoom = "animate-carousal-zoom",
  "fade-slide" = "animate-carousal-fade-slide",
  "zoom-slide" = "animate-carousal-zoom-slide",
}

const Carousel = clientOnly(async () => {
  return {
    default: (props: CarouselProps) => {
      const {
        autoPlay = true,
        moveDurationSeconds = 3,
        pauseOnMouseEnter = true,
        transitionEffect = "default",
      } = props;
      const MAX_LIFE = 100;
      const [cardIndex, setCardIndex] = createSignal(0);
      const [life, setLife] = createSignal(0);
      const [paused, setPaused] = createSignal(false);
      const transitionEffectAnimation =
        CarouselTransitionEffect[transitionEffect];
      let progressInterval: NodeJS.Timeout;
      let currentCardRef!: HTMLDivElement;

      const resolvedChildren = children(
        () => props.children
      ) as unknown as () => ResolvedJSXElement[];
      const currentCard = () => resolvedChildren()[cardIndex()];
      const sliderCardPaused = () => paused() && pauseOnMouseEnter;
      const pageDirection = () => feature.translation.state().direction;

      async function prevCard() {
        currentCardRef.classList.add(transitionEffectAnimation);
        setLife(0);
        setCardIndex((prev) =>
          prev <= 0 ? resolvedChildren().length - 1 : prev - 1
        );
        setTimeout(() => {
          currentCardRef.classList.remove(transitionEffectAnimation);
        }, 500);
      }

      async function nextCard() {
        currentCardRef.classList.add(transitionEffectAnimation);
        setLife(0);
        setCardIndex((prev) =>
          prev >= resolvedChildren().length - 1 ? 0 : prev + 1
        );
        setTimeout(() => {
          currentCardRef.classList.remove(transitionEffectAnimation);
        }, 500);
      }

      function handleOnMouseEnter() {
        if (autoPlay) {
          setPaused(true);
        }
      }

      function handleOnMouseLeave() {
        if (autoPlay) {
          setPaused(false);
        }
      }

      onMount(() => {
        progressInterval = setInterval(() => {
          if (sliderCardPaused() || !autoPlay) return;
          setLife((prev) => {
            if (prev >= MAX_LIFE) {
              nextCard();
              return 0;
            }
            return prev + 1;
          });
        }, (moveDurationSeconds * 1000) / MAX_LIFE);
      });

      onCleanup(() => {
        clearInterval(progressInterval);
      });

      if (resolvedChildren().length <= 0) return null;

      return (
        <Flex direction="column" gap="sm">
          <div
            ref={currentCardRef}
            class={cn(
              "relative w-full h-[200px] rounded-md overflow-y-auto overflow-x-hidden"
            )}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            {currentCard()}
          </div>
          <Flex items="center" justify="between">
            <Button onClick={prevCard} size="icon">
              <Show
                when={pageDirection() === "ltr"}
                fallback={<Icon.ArrowRight />}
              >
                <Icon.ArrowLeft />
              </Show>
            </Button>
            <Typography.P>
              <Show
                when={pageDirection() === "ltr"}
                fallback={`${resolvedChildren().length}/${cardIndex() + 1}`}
              >
                {cardIndex() + 1}/{resolvedChildren().length}
              </Show>
            </Typography.P>
            <Button onClick={nextCard} size="icon">
              <Show
                when={pageDirection() === "ltr"}
                fallback={<Icon.ArrowLeft />}
              >
                <Icon.ArrowRight />
              </Show>{" "}
            </Button>
          </Flex>
        </Flex>
      );
    },
  };
});

export default Carousel;
