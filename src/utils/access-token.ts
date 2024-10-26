export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export function setAccessToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function clearAccessToken() {
  localStorage.removeItem("access_token");
}

export function hasAccessToken(): boolean {
  const token = getAccessToken();
  return typeof token === "string" && token !== "";
}
