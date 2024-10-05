import { AuthFeature } from "./features/auth";
import { UserFeature } from "./features/user";

class Feature {
  readonly user = new UserFeature();
  readonly auth = new AuthFeature();
}

export const feature = new Feature();
