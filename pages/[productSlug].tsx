import * as React from "react";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { useProduct } from "../hooks/useProduct";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isSuccess } = useProduct(`${id}`);

  if (isLoading) {
    return <div>Loading Product...</div>;
  }

  if (isSuccess) {
    const imageSource =
      Array.isArray(data?.included) && data?.included[0]?.attributes.styles[2].url;
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
        </div>
      </Layout>
    );
  }
  return <div>PRODUCT NOT FOUND</div>;
};

export default ProductDetail;
