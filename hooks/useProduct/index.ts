import { useQuery } from "react-query";

import { IProduct } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
import { spreeClient } from "../../config/spree";
import { SpreeSDKError } from "@spree/storefront-api-v2-sdk/types/errors";

const fetchProduct = async (id: string): Promise<IProduct | SpreeSDKError> => {
  const response = await spreeClient.products.show(id, {
    include: "images",
  });

  if (response.isSuccess) {
    return response.success();
  } else {
    return response.fail();
  }
};

const useProduct = (id: string) => {
  return useQuery<IProduct | SpreeSDKError, false>(["product", id], () =>
    fetchProduct(id)
  );
};

export { useProduct, fetchProduct };
