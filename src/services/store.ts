import axios from "axios";
import { getApiUrl } from "~/utils/get-api-url";

export interface StoreType {
  _id: string;
  name: string;
  ownerId: string;
  type: string;
}

export interface HomeStoreType extends StoreType {
  ownerName: string;
}

export class StoreService {
  async getStores(): Promise<StoreType[]> {
    const response = await axios.get(getApiUrl("stores"));
    return response.data;
  }

  async getStoresSize(): Promise<number> {
    const response = await axios.get(`${getApiUrl("stores")}/size`);
    return response.data;
  }

  async getHomeStores(): Promise<HomeStoreType[]> {
    const response = await axios.get(`${getApiUrl("stores")}/home`);
    return response.data;
  }
}
