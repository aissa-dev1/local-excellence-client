export function getStorageAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export function setStorageAccessToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function clearStorageAccessToken() {
  localStorage.removeItem("access_token");
}

export function hasStorageAccessToken(): boolean {
  const token = getStorageAccessToken();
  return typeof token === "string" && token !== "";
}
