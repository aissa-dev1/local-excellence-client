import {
  createContext,
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import Card from "../ui/card";
import Button from "../ui/button";
import Spacing from "../ui/spacing";
import { cn } from "~/utils/cn";

interface Toast {
  id: string;
  message: string;
  variant: keyof typeof ToastVariants;
  durationSeconds: number;
}

export interface ToastContextType {
  addToast: (message: string, options?: Partial<AddToastOptions>) => void;
  removeToast: (id: string) => void;
}

interface AddToastOptions {
  variant: keyof typeof ToastVariants;
  durationSeconds: number;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

const ToastVariants = {
  default: "border-transparent bg-card text-card-foreground",
  destructive: "border-transparent bg-destructive text-destructive-foreground",
};

interface ToastCardProps extends Toast {
  removeToast: (id: string) => void;
}

function ToastCard(props: ToastCardProps) {
  const MAX_LIFE = 100;
  const [life, setLife] = createSignal(MAX_LIFE);
  const [lifePaused, setLifePaused] = createSignal(false);
  let lifeInterval: NodeJS.Timeout;

  onMount(() => {
    lifeInterval = setInterval(() => {
      if (lifePaused()) return;

      setLife((prev) => prev - 1);
    }, (props.durationSeconds * 1000) / MAX_LIFE);
  });

  createEffect(() => {
    if (life() <= 0) {
      props.removeToast(props.id);
    }
  });

  onCleanup(() => {
    clearInterval(lifeInterval);
  });

  return (
    <Card.Self
      class={cn("relative p-4", ToastVariants[props.variant])}
      onMouseEnter={() => setLifePaused(true)}
      onMouseLeave={() => setLifePaused(false)}
    >
      <span
        class="absolute left-0 top-0 h-1 bg-primary"
        style={{
          width: `${life()}%`,
        }}
      ></span>
      <Spacing.GapY size="content-md">
        <Card.Title>{props.message}</Card.Title>
        <div class="flex items-end justify-end">
          <Button class="w-fit" onClick={() => props.removeToast(props.id)}>
            Close
          </Button>
        </div>
      </Spacing.GapY>
    </Card.Self>
  );
}

export function ToastProvider(props: ParentProps) {
  const [toasts, setToasts] = createSignal<Toast[]>([]);

  function addToast(message: string, options?: Partial<AddToastOptions>) {
    const id = crypto.randomUUID();

    if (toasts().length >= 3) {
      setToasts([]);
    }

    setToasts([
      ...toasts(),
      {
        id,
        message,
        variant: options?.variant ? options.variant : "default",
        durationSeconds: options?.durationSeconds ? options.durationSeconds : 3,
      },
    ]);
  }

  function removeToast(id: string) {
    setToasts(toasts().filter((toast) => toast.id !== id));
  }

  onCleanup(() => setToasts([]));

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {props.children}
      <Spacing.GapY
        size="content-sm"
        class="fixed top-4 right-0 w-[90%] h-fit z-20 left-1/2 transform -translate-x-1/2 lg:w-[350px] lg:bottom-4 lg:right-4 lg:top-auto lg:left-auto lg:transform-none"
      >
        <For each={toasts()}>
          {(toast) => <ToastCard {...toast} removeToast={removeToast} />}
        </For>
      </Spacing.GapY>
    </ToastContext.Provider>
  );
}
