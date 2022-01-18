import React from "react";
import { fetchStreams, fetchProducts, useProducts, useStreams } from "../../../hooks";
import { ProductCard } from "../..";
import {
  Container,
  Grid,
  LatestTitle,
  ProductBox,
  ProductImg,
  ProductTitle,
  ProductTitleBox,
  ProductRate,
  ProductDesc,
  ThreeDotWrapper,
  Dot1,
  Dot2,
  Dot3,
  ThreeDot,
  Price
} from "./MobileLatest.styles";
export interface MobileLatestProps {
  data: any;
  title: string;
}
const MobileLatest: React.FC<MobileLatestProps> = (props) => {
  const { title, data } = props;
  const { data: products, isLoading, isSuccess } = useProducts(1);
  return (
    <Container>
      <LatestTitle>{title}</LatestTitle>
      <Grid>
        {products?.data.map((item: any, index: any) => {
          const defaultImg =
            "https://static-assets.strikinglycdn.com/images/ecommerce/ecommerce-default-image.png";
          const productImg = item.relationships?.images?.data[0]?.id;
          const foundImg = data?.included.filter((e: any) => e["id"] == productImg);
          const imgUrl = foundImg[0]?.attributes?.styles[4].url;
          const imgSrc = productImg ? `${process.env.SPREE_API_URL}${imgUrl}` : defaultImg;
          // console.log(item, productImg, foundImg, imgUrl);
          return <ProductCard item={item} imgSrc={imgSrc} />;
        })}
      </Grid>
    </Container>
  );
};
export default MobileLatest;
