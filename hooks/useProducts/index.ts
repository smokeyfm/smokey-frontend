import { useQuery } from "react-query";
import { IProducts } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
import { spreeClient } from "../../config/spree";
// When using the SDK in a <script> tag or as part of a Webpack bundle
// targeted for the browser, instead use:
// import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'

const fetchProducts = async (page = 1) => {
  const response = await spreeClient.products.list({
    include: "images",
  });
  return response.success();
};

const useProducts = (page: number) => {
  return useQuery<IProducts, false>(["products", page], () =>
    fetchProducts(page)
  );
};

export { useProducts, fetchProducts };
