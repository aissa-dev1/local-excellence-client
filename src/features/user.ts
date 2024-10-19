import { createStore } from "solid-js/store";

interface UserFeatureState {
  id: string;
  email: string;
  userName: string;
  joinedAt: number;
}

export interface JWTUserType {
  sub: string;
  email: string;
  userName: string;
  joinedAt: number;
}

export class UserFeature {
  private readonly store = createStore<UserFeatureState>({
    id: "",
    email: "",
    userName: "",
    joinedAt: 0,
  });

  update(state: UserFeatureState) {
    for (const stateKey in state) {
      this.setStore(
        stateKey as keyof UserFeatureState,
        state[stateKey as keyof UserFeatureState]
      );
    }
  }

  state(): UserFeatureState {
    return this.store[0];
  }

  private setStore<K extends keyof UserFeatureState>(
    key: K,
    value: UserFeatureState[K]
  ) {
    this.store[1](key, value);
  }
}
