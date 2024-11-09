import { AppearanceFeature } from "./features/appearance";
import { AuthFeature } from "./features/auth";
import { RedirectFeature } from "./features/redirect";
import { ToastFeature } from "./features/toast";
import { UserFeature } from "./features/user";

class Feature {
  readonly appearance = new AppearanceFeature();
  readonly toast = new ToastFeature();
  readonly user = new UserFeature();
  readonly auth = new AuthFeature();
  readonly redirect = new RedirectFeature();
}

export const feature = new Feature();
