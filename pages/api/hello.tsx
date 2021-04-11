// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { makeClient } from "@spree/storefront-api-v2-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
// import {SoundCloud} from 'soundcloud-api-client';
const client = makeClient({
  host: "http://a77b869b2f28.ngrok.io",
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  const products = client.products.list({ page: 1 });
  console.log("products: ", products);
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};

// const client_id = 'your-client-id';
// const soundcloud = new SoundCloud({ client_id });
 
// const q = 'live mix';
// const genres = [ 'house', 'tech-house', 'techno' ].join(',');
//  export const Result = soundcloud.get('/tracks', { q, genres })
//  .then(tracks => console.log(`*********************`, tracks))
//  .catch(e => console.log(`************`, e));
