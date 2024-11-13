import { CURRENCY } from "~/constants";
import { feature } from "~/feature";

export function useCurrency() {
  return () => CURRENCY.DZD[feature.translation.state().direction];
}
