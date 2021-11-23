import * as React from "react";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { useProduct, fetchProduct } from "../hooks/useProduct";
import { useMutation, useQueryClient } from "react-query";
import { addItemToCart } from "../hooks/useCart";
import { QueryKeys } from "../hooks/queryKeys";
import * as tracking from "../config/tracking";

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

  React.useEffect(() => {
    if (isSuccess) {
      // On page load, set focus on the product contaniner, because otherwise the arrow keys (left/right) won't work
      const productContainer = Array.from(
        document.getElementsByClassName("product-container")
      ).shift();

      if (productContainer) {
        (productContainer as HTMLElement).focus();
      }

      tracking.trackEvent({
        action: tracking.Action.VIEW_PRODUCT,
        category: tracking.Category.PRODUCT_DETAIL,
        label: data?.data?.attributes?.name
      });
    }
  }, [`${id}`, isSuccess]);

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

    const handleKeyPress = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
          let productId: number = parseInt(`${id}`);
          productId = event.key == "ArrowLeft" ? productId - 1 : productId + 1;

          fetchProduct(`${productId}`)
            .then((product) => {
              router.push(`/${product?.data?.attributes?.slug}?id=${product?.data?.id}`);
            })
            .catch(() => {
              /* product not found */
            });
          break;
      }
    };

    const imageSource =
      Array.isArray(data?.included) && data?.included[0]?.attributes?.styles?.[2].url;
    const source = imageSource
      ? `http://localhost:8080${imageSource}`
      : "https://via.placeholder.com/150";

    return (
      <Layout>
        <div className="product-container" tabIndex={-1} onKeyDown={handleKeyPress}>
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
