import axios from "axios";
import { getAccessToken } from "~/utils/access-token";
import { getApiUrl } from "~/utils/get-api-url";

export interface SponsorType {
  _id: string;
  storeId: string;
  backgroundColor: string;
  color: string;
  description: string;
}

export interface CreateSponsorData {
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

  async getSponsorByStoreId(id: string): Promise<SponsorType> {
    const response = await axios.get(`${getApiUrl("sponsors")}/storeId/${id}`);
    return response.data;
  }

  async createSponsor(data: CreateSponsorData): Promise<string> {
    const response = await axios.post(getApiUrl("sponsors"), data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  }
}
