import axios from "axios";
import { getApiUrl } from "~/utils/get-api-url";

export interface SponsorType {
  _id: string;
  storeId: string;
  backgroundColor: string;
  color: string;
  description: string;
}

export class SponsorService {
  async getSponsors(): Promise<SponsorType[]> {
    const response = await axios.get(getApiUrl("sponsors"));
    return response.data;
  }
}
