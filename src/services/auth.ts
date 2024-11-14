import axios from "axios";
import { feature } from "~/feature";
import { getApiUrl } from "~/utils/get-api-url";

export interface AuthSignUpData {
  email: string;
  password: string;
  userName: string;
}

export interface AuthLoginData {
  email: string;
  password: string;
}

interface AuthLoginResponse {
  message: string;
  accessToken: string;
}

export class AuthService {
  async signUp(data: AuthSignUpData): Promise<string> {
    const response = await axios.post(`${getApiUrl("auth")}/sign-up`, {
      ...data,
      language: feature.translation.state().language,
    });
    return response.data;
  }

  async login(data: AuthLoginData): Promise<AuthLoginResponse> {
    const response = await axios.post(`${getApiUrl("auth")}/login`, {
      ...data,
      language: feature.translation.state().language,
    });
    return response.data;
  }

  async signOut(): Promise<string> {
    const response = await axios.post(
      `${getApiUrl("auth")}/sign-out?language=${
        feature.translation.state().language
      }`
    );
    return response.data;
  }
}
