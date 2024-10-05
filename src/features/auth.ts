import { createStore } from "solid-js/store";

interface AuthFeatureState {
  isAuthenticated: boolean;
  accessToken: string | null;
}

export class AuthFeature {
  private readonly store = createStore<AuthFeatureState>({
    isAuthenticated: false,
    accessToken: null,
  });

  updateIsAuthenticated(authenticated: boolean) {
    this.setStore("isAuthenticated", authenticated);
  }

  updateAccessToken(token: string) {
    this.setStore("accessToken", token);
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
