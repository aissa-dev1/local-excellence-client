import { createStore } from "solid-js/store";

interface AuthFeatureState {
  isAuthenticated: boolean;
}

export class AuthFeature {
  private readonly store = createStore<AuthFeatureState>({
    isAuthenticated: false,
  });

  updateIsAuthenticated(authenticated: boolean) {
    this.setStore("isAuthenticated", authenticated);
  }

  state(): AuthFeatureState {
    return this.store[0];
  }

  private setStore<K extends keyof AuthFeatureState>(
    key: K,
    value: AuthFeatureState[K]
  ) {
    this.store[1](key, value);
  }
}
