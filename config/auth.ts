// src/lib/auth.ts

import { initReactQueryAuth } from "react-query-auth";
import { IAccount } from "@spree/storefront-api-v2-sdk/types/interfaces/Account";
import { SpreeSDKError } from "@spree/storefront-api-v2-sdk/types/errors";
import { spreeClient } from "./spree";
import { storage } from "./storage";

interface LoginUser {
  username: string;
  password: string;
}

interface SpreeUser {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
  };
}

const authConfig = {
  loadUser: async () => {
    const token = storage.getToken();
    if (token?.access_token && token?.token_type === "Bearer") {
      const response = await spreeClient.account.accountInfo({ bearerToken: token.access_token });
      if (response.isSuccess()) {
        return response.success();
      }
      Promise.reject(response.fail());
    } else {
      Promise.reject("No token found");
    }
  },
  loginFn: async (data: unknown) => {
    const response = await spreeClient.authentication.getToken(data as LoginUser);
    if (response.isSuccess()) {
      const result = response.success();
      storage.setToken(result);
      const user = await authConfig.loadUser();
      return user;
    } else {
      Promise.reject(response.fail());
    }
  },
  registerFn: async (data: unknown) => {
    const response = await spreeClient.account.create(data as SpreeUser);
    if (response.isSuccess()) {
      return response.success();
    } else {
      Promise.reject(response.fail());
    }
  },
  logoutFn: async () => {
    storage.clearToken();
  }
};

export const { AuthProvider, useAuth } = initReactQueryAuth<IAccount, string>(authConfig);
