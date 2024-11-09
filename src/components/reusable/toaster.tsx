import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import Card from "../ui/card";
import Button from "../ui/button";
import Spacing from "../ui/spacing";
import { cn } from "~/utils/cn";
import { feature } from "~/feature";
import { Toast } from "~/features/toast";

interface ToastCardProps extends Toast {
  removeToast: (id: string) => void;
}

function ToastCard({
  id,
  title,
  description,
  variant,
  durationSeconds,
  removeToast,
}: ToastCardProps) {
  const MAX_LIFE = 100;
  let lifeInterval: NodeJS.Timeout;
  const [life, setLife] = createSignal(MAX_LIFE);
  const [lifePaused, setLifePaused] = createSignal(false);

  onMount(() => {
    lifeInterval = setInterval(() => {
      if (lifePaused()) return;
      setLife((prev) => prev - 1);
    }, (durationSeconds * 1000) / MAX_LIFE);
  });

  createEffect(() => {
    if (life() <= 0) {
      removeToast(id);
    }
  });

  onCleanup(() => {
    clearInterval(lifeInterval);
  });

  return (
    <div
      class="bg-background text-foreground group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all z-50 dark:border-gray-700"
      onMouseEnter={() => setLifePaused(true)}
      onMouseLeave={() => setLifePaused(false)}
    >
      <div class="w-full flex items-center justify-between">
        <Spacing.GapY size="content-sm" class="w-full">
          <Card.Title
            class={cn({
              "text-red-500": variant === "error",
              "text-green-500": variant === "success",
            })}
          >
            {title}
          </Card.Title>
          <Card.Description>{description}</Card.Description>
        </Spacing.GapY>
        <Button variant="outline" class="w-fit" onClick={() => removeToast(id)}>
          Close
        </Button>
      </div>
    </div>
  );
}

export function Toaster() {
  return (
    <Spacing.GapY
      size="content-sm"
      class="fixed top-4 right-0 w-[90%] h-fit z-20 left-1/2 transform -translate-x-1/2 lg:w-[350px] lg:bottom-4 lg:right-4 lg:top-auto lg:left-auto lg:transform-none"
    >
      <For each={feature.toast.state().toasts}>
        {(toast) => (
          <ToastCard
            {...toast}
            removeToast={(id) => feature.toast.removeToast(id)}
          />
        )}
      </For>
    </Spacing.GapY>
  );
}
