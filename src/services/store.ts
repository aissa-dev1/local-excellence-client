import axios from "axios";
import { feature } from "~/feature";
import { getAccessToken } from "~/utils/access-token";
import { getApiUrl } from "~/utils/get-api-url";

export interface StoreType {
  _id: string;
  userId: string;
  name: string;
  description: string;
  type: string;
  createdAt: number;
}

export interface CreateStoreData {
  name: string;
  description: string;
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

  async getStoresSize(): Promise<number> {
    const response = await axios.get(`${getApiUrl("stores")}/size`);
    return response.data;
  }

  async getHomeStores(): Promise<StoreType[]> {
    const response = await axios.get(`${getApiUrl("stores")}/home`);
    return response.data;
  }

  async getStoresByUserId(id: string): Promise<StoreType[]> {
    const response = await axios.get(`${getApiUrl("stores")}/userId/${id}`);
    return response.data;
  }

  async getStoreByName(name: string): Promise<StoreType> {
    const response = await axios.get(
      `${getApiUrl("stores")}/name/${name}?language=${
        feature.translation.state().language
      }`
    );
    return response.data;
  }

  async getStoreById(id: string): Promise<StoreType> {
    const response = await axios.get(
      `${getApiUrl("stores")}/id/${id}?language=${
        feature.translation.state().language
      }`
    );
    return response.data;
  }

  async getStoreTypes(): Promise<string[]> {
    const response = await axios.get(`${getApiUrl("stores")}/types`);
    return response.data;
  }

  async searchStores(query: string): Promise<StoreType[]> {
    const response = await axios.post(
      `${getApiUrl("stores")}/search?query=${query}`
    );
    return response.data;
  }

  async createStore(data: CreateStoreData): Promise<string> {
    const response = await axios.post(
      getApiUrl("stores"),
      {
        ...data,
        language: feature.translation.state().language,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  }
}
