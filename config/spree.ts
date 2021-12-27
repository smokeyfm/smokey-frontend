import { makeClient } from "@spree/storefront-api-v2-sdk";

export const spreeClient = makeClient({
  host: process.env.SPREE_API_URL
});
