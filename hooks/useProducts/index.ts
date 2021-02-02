import { useQuery } from "react-query";
import { makeClient } from "@spree/storefront-api-v2-sdk";
import { IProducts } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
// When using the SDK in a <script> tag or as part of a Webpack bundle
// targeted for the browser, instead use:
// import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'

const client = makeClient({
  host: "http://localhost:8080",
});

const fetchProducts = async (page = 1) => {
  const response = await client.products.list({
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
