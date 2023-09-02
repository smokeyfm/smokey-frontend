import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchStreams, fetchProducts, useProducts, useStreams } from "../../hooks";
import {
  Container,
  Dot1,
  Dot2,
  Dot3,
  MyProductTitle,
  Price,
  ProductDesc,
  ProductFooter,
  ProductFooterLeft,
  ProductFooterRight,
  ProductImg,
  ProductImgOutterBox,
  ProductRate,
  ThreeDot,
  Title
} from "./PolProductList.styles";
export type product = { title: string; desc: string; img: string; price: string; rate: number };
export interface PolProductListProps {
  data: product[];
  title?: string;
}
const PolProductList: React.FC<PolProductListProps> = (props) => {
  const { data, title } = props;
  const { data: products, isLoading, isSuccess } = useProducts(1);

  useEffect(() => {
    if (products) {
      console.log("PRODUCTS: ", data);
    }
  }, []);

  // if (isLoading) return <div>Loading</div>;

  // if (!isSuccess) {
  //   return <div>Could not load products</div>;
  // }

  return (
    <Container>
      <Title>{props.title}</Title>
      <Swiper
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}
      >
        {products?.data.map((item: any, index: any) => {
          const productImg = item.relationships?.images?.data[0]?.img;
          console.log(productImg);
          return (
            <SwiperSlide key={index}>
              <ProductImgOutterBox>
                <ProductImg
                  src={
                    productImg ||
                    "https://static-assets.strikinglycdn.com/images/ecommerce/ecommerce-default-image.png"
                  }
                />
              </ProductImgOutterBox>
              <ProductFooter>
                <ProductFooterLeft>
                  <MyProductTitle>{item.attributes.name}</MyProductTitle>
                  {/* <ProductDesc>{item.attributes.description}</ProductDesc> */}
                  <ThreeDot>
                    <Dot1 as={"span"}></Dot1>
                    <Dot2 as={"span"}></Dot2>
                    <Dot3 as={"span"}></Dot3>
                  </ThreeDot>
                </ProductFooterLeft>
                <ProductFooterRight>
                  <ProductRate name="simple-controlled" value={item.attributes.rate} />
                  <Price>${item.attributes.price}</Price>
                </ProductFooterRight>
              </ProductFooter>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default PolProductList;
