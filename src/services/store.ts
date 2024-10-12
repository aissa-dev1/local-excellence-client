import axios from "axios";
import { getApiUrl } from "~/utils/get-api-url";

export interface StoreType {
  _id: string;
  name: string;
  ownerId: string;
  type: string;
}

export class StoreService {
  async getStores(): Promise<StoreType[]> {
    const response = await axios.get(getApiUrl("stores"));
    return response.data;
  }

  async getPaginatedStores(
    page: number = 1,
    limit: number = 5
  ): Promise<StoreType[]> {
    const response = await axios.get(
      `${getApiUrl("stores")}/paginated?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async searchStores(query: string): Promise<StoreType[]> {
    const response = await axios.get(
      `${getApiUrl("stores")}/search?query=${query}`
    );
    return response.data;
  }

  async getStoresSize(): Promise<number> {
    const response = await axios.get(`${getApiUrl("stores")}/size`);
    return response.data;
  }

  async getHomeStores(): Promise<StoreType[]> {
    const response = await axios.get(`${getApiUrl("stores")}/home`);
    return response.data;
  }

  async getStoreByName(name: string): Promise<StoreType> {
    const response = await axios.get(`${getApiUrl("stores")}/name/${name}`);
    return response.data;
  }
}
