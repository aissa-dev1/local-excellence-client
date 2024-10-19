import { AuthService } from "./services/auth";
import { ProductService } from "./services/product";
import { SponsorService } from "./services/sponsor";
import { StoreService } from "./services/store";
import { UserService } from "./services/user";

class Service {
  readonly user = new UserService();
  readonly auth = new AuthService();
  readonly store = new StoreService();
  readonly product = new ProductService();
  readonly sponsor = new SponsorService();
}

export const service = new Service();
