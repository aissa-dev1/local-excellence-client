import { BaseFeature } from "./base-feature";

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

export class UserFeature extends BaseFeature<UserFeatureState> {
  constructor() {
    super({
      id: "",
      email: "",
      userName: "",
      joinedAt: 0,
    });
  }
}
