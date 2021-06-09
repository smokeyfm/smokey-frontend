import { AddItem } from "@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass";
import { IToken } from "@spree/storefront-api-v2-sdk/types/interfaces/Token";
import { useQuery } from "react-query";
import { spreeClient } from "../../config/spree";

const createCart = async (token: IToken) => {
  const response = await spreeClient.cart.create(token);
  if (response.isSuccess()) {
    return response.success();
  }
};

const showCart = async (token: IToken) => {
  const response = await spreeClient.cart.show(token);
  if (response.isSuccess()) {
    return response.success();
  }
};

const addItem = async (token: IToken, item: AddItem) => {
  const response = await spreeClient.cart.addItem(token, item);
};
