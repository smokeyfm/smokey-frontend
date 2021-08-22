import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
  return (
    <Container>
      <Title>{title}</Title>
      <Swiper
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductImgOutterBox>
              <ProductImg src={item.img} />
            </ProductImgOutterBox>
            <ProductFooter>
              <ProductFooterLeft>
                <MyProductTitle>{item.title}</MyProductTitle>
                <ProductDesc>{item.desc}</ProductDesc>
                <ThreeDot>
                  <Dot1 as={"span"}></Dot1>
                  <Dot2 as={"span"}></Dot2>
                  <Dot3 as={"span"}></Dot3>
                </ThreeDot>
              </ProductFooterLeft>
              <ProductFooterRight>
                <ProductRate name="simple-controlled" value={item.rate} />
                <Price>{item.price}</Price>
              </ProductFooterRight>
            </ProductFooter>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
export default PolProductList;
