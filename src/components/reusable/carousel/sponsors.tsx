import { A } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import Button from "~/components/ui/button";
import Spacing from "~/components/ui/spacing";
import Typography from "~/components/ui/typography";
import { SponsorType } from "~/services/sponsor";
import { cn } from "~/utils/cn";

interface SponsorsCarouselProps {
  carouselData: SponsorType[];
  autoPlay?: boolean;
  moveDurationSeconds?: number;
  pauseOnMouseEnter?: boolean;
  dynamicTheme?: boolean;
  transitionEffect?: keyof typeof SponsorsCarouselTransitionEffect;
}

enum SponsorsCarouselTransitionEffect {
  default = "animate-default",
  fade = "animate-fade",
  slide = "animate-slide",
  zoom = "animate-zoom",
  "fade-slide" = "animate-fade-slide",
  "zoom-slide" = "animate-zoom-slide",
}

export default function SponsorsCarousel(props: SponsorsCarouselProps) {
  const {
    carouselData,
    autoPlay = true,
    moveDurationSeconds = 3,
    pauseOnMouseEnter = true,
    dynamicTheme = false,
    transitionEffect = "default",
  } = props;

  const MAX_LIFE = 100;
  const [cardIndex, setCardIndex] = createSignal(0);
  const [life, setLife] = createSignal(0);
  const [paused, setPaused] = createSignal(false);
  const currentCard = () => carouselData[cardIndex()];
  const sliderCardPaused = () => paused() && pauseOnMouseEnter;
  const transitionEffectAnimation =
    SponsorsCarouselTransitionEffect[transitionEffect];

  let progressInterval: NodeJS.Timeout;
  let currentCardRef!: HTMLDivElement;

  const prevCard = () => {
    currentCardRef.classList.add(transitionEffectAnimation);
    setCardIndex((prev) => (prev <= 0 ? carouselData.length - 1 : prev - 1));
    setLife(0);

    setTimeout(() => {
      currentCardRef.classList.remove(transitionEffectAnimation);
    }, 500);
  };

  const nextCard = () => {
    currentCardRef.classList.add(transitionEffectAnimation);
    setCardIndex((prev) => (prev >= carouselData.length - 1 ? 0 : prev + 1));
    setLife(0);

    setTimeout(() => {
      currentCardRef.classList.remove(transitionEffectAnimation);
    }, 500);
  };

  const handleOnMouseEnter = () => {
    if (autoPlay) {
      setPaused(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (autoPlay) {
      setPaused(false);
    }
  };

  onMount(() => {
    progressInterval = setInterval(() => {
      if (sliderCardPaused() || !autoPlay) return;

      setLife((prev) => prev + 1);
    }, (moveDurationSeconds * 1000) / MAX_LIFE);
  });

  createEffect(() => {
    if (life() >= MAX_LIFE) {
      nextCard();
    }
  });

  onCleanup(() => {
    clearInterval(progressInterval);
  });

  return (
    <Spacing.GapY size="content-sm">
      <div
        ref={currentCardRef}
        class={cn("relative w-full min-h-[225px] rounded-md overflow-hidden", {
          "bg-card text-foreground": !dynamicTheme,
        })}
        style={
          dynamicTheme
            ? {
                "background-color": currentCard()?.backgroundColor,
                color: currentCard()?.color,
              }
            : {}
        }
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <div class="p-6">
          <Spacing.GapY size="content-sm">
            <div class="flex items-center justify-between gap-2">
              <Typography.H3>{currentCard()?.ownerStoreName}</Typography.H3>
              {autoPlay && (
                <span
                  class="relative w-14 h-1.5 bg-slate-500 rounded-md cursor-pointer duration-300 hover:h-2.5 flex-shrink"
                  onClick={() => setLife(0)}
                >
                  <span
                    class="absolute top-0 left-0 h-full rounded-md rounded-r-none bg-background"
                    style={{ width: `${life()}%` }}
                  />
                </span>
              )}
            </div>
            <Typography.P>{currentCard()?.description}</Typography.P>
            <Show
              when={currentCard().dynamicLink}
              fallback={
                <a href={currentCard()?.href} target="_blank" class="w-fit">
                  <Button variant="secondary" class="mt-2">
                    {currentCard()?.btnText}
                  </Button>
                </a>
              }
            >
              <A href={currentCard()?.href} class="w-fit">
                <Button variant="secondary" class="mt-2">
                  {currentCard()?.btnText}
                </Button>
              </A>
            </Show>
          </Spacing.GapY>

          <Typography.P class="absolute right-6 bottom-6">
            {cardIndex() + 1}/{carouselData.length}
          </Typography.P>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <Button onClick={prevCard}>Prev</Button>
        <Button onClick={nextCard}>Next</Button>
      </div>
    </Spacing.GapY>
  );
}
