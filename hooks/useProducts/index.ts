import { useQuery } from "react-query";
import { IProducts } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
import { spreeClient } from "../../config/spree";

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
  return useQuery<IProducts, false>(["products", page], () => fetchProducts(page));
};

export { useProducts, fetchProducts };
