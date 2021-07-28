import { useQuery } from "react-query";
import { IProducts } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
import { spreeClient } from "../../config/spree";
import { QueryKeys } from "../queryKeys";

const fetchProducts = async (page: number = 1) => {
  const response = await spreeClient.products.list({
    include: "images"
  });
  if (response.isSuccess()) {
    return response.success();
  } else {
    throw new Error("Products request failed");
  }
};

const useProducts = (page: number) => {
  return useQuery<IProducts, false>([QueryKeys.PRODUCTS, page], () => fetchProducts(page));
};

export { useProducts, fetchProducts };
