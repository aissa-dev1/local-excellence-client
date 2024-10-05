import { AuthService } from "./services/auth";
import { SponsorService } from "./services/sponsor";
import { StoreService } from "./services/store";

class Service {
  readonly auth = new AuthService();
  readonly store = new StoreService();
  readonly sponsor = new SponsorService();
}

export const service = new Service();
