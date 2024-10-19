import axios from "axios";
import { getApiUrl } from "~/utils/get-api-url";

export interface ProductType {
  _id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  createdAt: number;
}

export class ProductService {
  async getProducts(): Promise<ProductType[]> {
    const response = await axios.get(getApiUrl("products"));
    return response.data;
  }

  async getPaginatedProducts(
    page: number = 1,
    limit: number = 5
  ): Promise<ProductType[]> {
    const response = await axios.get(
      `${getApiUrl("products")}/paginated?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async searchProducts(query: string): Promise<ProductType[]> {
    const response = await axios.post(
      `${getApiUrl("products")}/search?query=${query}`
    );
    return response.data;
  }

  async getProductsSize(): Promise<number> {
    const response = await axios.get(`${getApiUrl("products")}/size`);
    return response.data;
  }

  async getHomeProducts(): Promise<ProductType[]> {
    const response = await axios.get(`${getApiUrl("products")}/home`);
    return response.data;
  }

  async getProductsByStoreId(storeId: string): Promise<ProductType[]> {
    const response = await axios.get(
      `${getApiUrl("products")}/storeId/${storeId}`
    );
    return response.data;
  }

  async getProductById(id: string): Promise<ProductType> {
    const response = await axios.get(`${getApiUrl("products")}/id/${id}`);
    return response.data;
  }
}
