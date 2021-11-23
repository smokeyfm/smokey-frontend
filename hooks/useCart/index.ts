import { AddItem } from "@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass";
import { IOrder } from "@spree/storefront-api-v2-sdk/types/interfaces/Order";
import { useQuery } from "react-query";
import { spreeClient } from "../../config/spree";
import { QueryKeys } from "../queryKeys";

export const showCart = async () => {
  const storage = (await import("../../config/storage")).default;
  const token = await storage.getToken();
  if (token) {
    const getCart = await spreeClient.cart.show({ bearerToken: token.access_token });
    if (getCart.isSuccess()) {
      return getCart.success();
    } else {
      const newCart = await spreeClient.cart.create({ bearerToken: token.access_token });
      if (newCart.isSuccess()) {
        return newCart.success();
      } else {
        throw new Error(newCart.fail().message);
      }
    }
  } else {
    const orderToken = storage.getGuestOrderToken();
    if (orderToken) {
      const response = await spreeClient.cart.show(orderToken);
      if (response.isSuccess()) {
        return response.success();
      } else {
        throw new Error(response.fail().message);
      }
    } else {
      const response = await spreeClient.cart.create();
      if (response.isSuccess()) {
        const result = response.success();
        storage.setGuestOrderToken({ orderToken: result.data.attributes.token });
        return result;
      } else {
        throw new Error(response.fail().message);
      }
    }
  }
};

export const addItemToCart = async (item: AddItem) => {
  const storage = (await import("../../config/storage")).default;
  const token = await storage.getToken();
  if (!token) {
    const orderToken = storage.getGuestOrderToken();
    if (orderToken) {
      const response = await spreeClient.cart.addItem(orderToken, item);
      if (response.isSuccess()) {
        return response.success();
      } else {
        throw new Error(response.fail().message);
      }
    }
    throw new Error("NO CART TOKENS FOUND, COULD NOT ADD ITEM");
  }
  const response = await spreeClient.cart.addItem({ bearerToken: token.access_token }, item);
  if (response.isSuccess()) {
    return response.success();
  } else {
    throw new Error(response.fail().message);
  }
};

export const useCart = () => {
  return useQuery<IOrder, false>([QueryKeys.CART], () => showCart());
};
