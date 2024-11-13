import { AppearanceFeature } from "./features/appearance";
import { AuthFeature } from "./features/auth";
import { RedirectFeature } from "./features/redirect";
import { ToastFeature } from "./features/toast";
import { TranslationFeature } from "./features/translation";
import { UserFeature } from "./features/user";

class Feature {
  readonly appearance = new AppearanceFeature();
  readonly toast = new ToastFeature();
  readonly user = new UserFeature();
  readonly auth = new AuthFeature();
  readonly redirect = new RedirectFeature();
  readonly translation = new TranslationFeature();
}

export const feature = new Feature();
