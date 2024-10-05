import axios from "axios";
import { getApiUrl } from "~/utils/get-api-url";

export interface SponsorType {
  _id: string;
  backgroundColor: string;
  color: string;
  ownerId: string;
  ownerStoreName: string;
  description: string;
  href: string;
  btnText: string;
  dynamicLink: boolean;
}

export class SponsorService {
  async getSponsors(): Promise<SponsorType[]> {
    const response = await axios.get(getApiUrl("sponsors"));
    return response.data;
  }
}
