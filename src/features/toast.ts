import { BaseFeature } from "./base-feature";

type ToastVariant = "default" | "success" | "error";

export interface Toast {
  id: string;
  title: string;
  description: string;
  variant: ToastVariant;
  durationSeconds: number;
}

interface AddToastOptions {
  variant?: ToastVariant;
  durationSeconds?: number;
}

interface ToastFeatureState {
  toasts: Toast[];
}

export class ToastFeature extends BaseFeature<ToastFeatureState> {
  constructor() {
    super({ toasts: [] });
  }

  addToast(title: string, description: string, options?: AddToastOptions) {
    const id = crypto.randomUUID();
    const newToast: Toast = {
      id,
      title,
      description,
      variant: options?.variant || "default",
      durationSeconds: options?.durationSeconds || 3,
    };

    if (this.state().toasts.length >= 3) {
      this.update({ toasts: [] });
    }

    this.update({ toasts: [...this.state().toasts, newToast] });
  }

  removeToast(id: string) {
    const toasts = this.state().toasts.filter((toast) => toast.id !== id);
    this.update({ toasts });
  }
}
