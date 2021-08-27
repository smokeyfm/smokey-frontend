import { useQuery } from "react-query";
import { IProduct } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
import { spreeClient } from "../../config/spree";
import { QueryKeys } from "../queryKeys";

const fetchProduct = async (id: string): Promise<IProduct> => {
  const storage = (await import("../../config/storage")).default;
  const token = await storage.getToken();
  const response = await spreeClient.products.show(
    id,
    {
      bearerToken: token ? token.access_token : undefined
    },
    {
      include: "images,default_variant"
    }
  );
  if (response.isSuccess()) {
    return response.success();
  } else {
    throw new Error("Product request failed");
  }
};

const useProduct = (id: string) => {
  return useQuery<IProduct, false>([QueryKeys.PRODUCT, id], () => fetchProduct(id));
};

export { useProduct, fetchProduct };
