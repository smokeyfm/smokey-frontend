import * as React from "react";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { useProduct } from "../hooks/useProduct";
import { useMutation, useQueryClient } from "react-query";
import { addItemToCart } from "../hooks/useCart";
import { QueryKeys } from "../hooks/queryKeys";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isSuccess } = useProduct(`${id}`);
  const queryClient = useQueryClient();
  const addToCart = useMutation(addItemToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.CART);
    }
  });

  if (isLoading) {
    return <div>Loading Product...</div>;
  }

  if (isSuccess) {
    const variants = data?.data.relationships.variants.data;
    const handleAddToCart = () =>
      addToCart.mutate({
        variant_id: Array.isArray(variants) ? variants[0].id : "",
        quantity: 1
      });
    const imageSource =
      Array.isArray(data?.included) && data?.included[0]?.attributes?.styles?.[2].url;
    const source = imageSource
      ? `http://localhost:8080${imageSource}`
      : "https://via.placeholder.com/150";

    return (
      <Layout>
        <div className="product-container">
          <img src={source} />
          <h1>{data?.data?.attributes?.name}</h1>
          <div>
            <h3>${data?.data?.attributes?.price}</h3>
          </div>
          <button onClick={handleAddToCart}>ADD TO CART</button>
        </div>
      </Layout>
    );
  }
  return <div>PRODUCT NOT FOUND</div>;
};

export default ProductDetail;
