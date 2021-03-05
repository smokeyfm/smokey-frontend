import { useQuery } from "react-query";
import { IProduct } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
import { spreeClient } from "../../config/spree";

const fetchProduct = async (id: string) => {
  const response = await spreeClient.products.show(id, {
    include: "images",
  });
  return response.success();
};

const useProduct = (id: string) => {
  return useQuery<IProduct, false>(["product", id], () => fetchProduct(id));
};

export { useProduct, fetchProduct };
