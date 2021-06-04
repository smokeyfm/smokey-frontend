import { IOAuthToken } from "@spree/storefront-api-v2-sdk/types/interfaces/Token";

export const storage = {
  getToken: (): IOAuthToken | undefined =>
    JSON.parse(window.localStorage.getItem("token") || "") || undefined,
  setToken: (token: IOAuthToken) => window.localStorage.setItem("token", JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem("token")
};
