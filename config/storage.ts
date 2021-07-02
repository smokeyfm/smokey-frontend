import { IOAuthToken } from "@spree/storefront-api-v2-sdk/types/interfaces/Token";

export const storage = {
  getToken: (): IOAuthToken | undefined => {
    const token = window.localStorage.getItem("token");
    if (token) {
      return JSON.parse(token);
    }
  },
  setToken: (token: IOAuthToken) => window.localStorage.setItem("token", JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem("token")
};
