import { useQuery } from "react-query";
import { IProduct } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
import { spreeClient } from "../../config/spree";
import { QueryKeys } from "../queryKeys";

const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await spreeClient.products.show(id, {
    include: "images,default_variant"
  });
  console.warn("FETCH PRODUCTS");
  if (response.isSuccess()) {
    console.warn("FETCH PRODUCTS SUCCESS");
    return response.success();
  } else {
    console.warn("FETCH PRODUCTS FAILED");
    throw new Error("Product request failed");
  }
};

const useProduct = (id: string) => {
  return useQuery<IProduct, false>([QueryKeys.PRODUCT, id], () => fetchProduct(id));
};

export { useProduct, fetchProduct };
