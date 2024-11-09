import { BaseFeature } from "./base-feature";

interface AuthFeatureState {
  isAuthenticated: boolean;
}

export class AuthFeature extends BaseFeature<AuthFeatureState> {
  constructor() {
    super({
      isAuthenticated: false,
    });
  }
}
