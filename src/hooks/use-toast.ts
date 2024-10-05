import { useContext } from "solid-js";
import {
  ToastContext,
  ToastContextType,
} from "~/components/context-providers/toast-provider";

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
