import axios from "axios";
import { getApiUrl } from "~/utils/get-api-url";

export interface UserType {
  _id: string;
  userName: string;
  joinedAt: number;
}

export class UserService {
  async getUserById(id: string): Promise<UserType> {
    const response = await axios.get(`${getApiUrl("users")}/id/${id}`);
    return response.data;
  }

  async getMinimizedUser(id: string): Promise<UserType> {
    const response = await axios.get(`${getApiUrl("users")}/minimized/${id}`);
    return response.data;
  }
}
