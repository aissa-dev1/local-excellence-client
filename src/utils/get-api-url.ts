import { API_URL_VERSIONS } from "~/constants";

export function getApiUrl(route: keyof typeof API_URL_VERSIONS): string {
  const defaultVersion = "v1";
  let version: string;

  if (route === "root") {
    version = defaultVersion;
    return `${import.meta.env.VITE_SERVER_URL}/api/${version}`;
  }

  version = API_URL_VERSIONS[route] || defaultVersion;
  return `${import.meta.env.VITE_SERVER_URL}/api/${version}/${route}`;
}
