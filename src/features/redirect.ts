import { BaseFeature } from "./base-feature";

interface RedirectFeatureState {
  redirectTo: string | null;
}

export class RedirectFeature extends BaseFeature<RedirectFeatureState> {
  constructor() {
    super({
      redirectTo: null,
    });
  }
}
