import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  InfluencerAvatar,
  InfluencerBox,
  InfluencerName,
  MyProductTitle,
  ProductDescBox,
  ProductImg,
  ProductImgOutterBox,
  ProductPrice,
  MySwiperWrap,
  MySlideWrap,
  Title
} from "./Products.styles";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
export type product = {
  name: string;
  influencer: string;
  rate: number;
  price: string;
  img: string;
  avatar: string;
};
export interface ProductsProps {
  data: product[];
}
SwiperCore.use([Navigation, Thumbs]);
const Products: React.FC<ProductsProps> = (props) => {
  const { data } = props;
  return (
    <MySwiperWrap>
      <Title>Live-Shopping</Title>
      <Swiper
        loop={true}
        spaceBetween={10}
        slidesPerView={7}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <MySlideWrap>
              <ProductImgOutterBox>
                <ProductImg src={item.img} alt={""} />
                <InfluencerBox>
                  <InfluencerAvatar src={item.avatar} />
                  <InfluencerName as={"span"}>{item.influencer}</InfluencerName>
                </InfluencerBox>
              </ProductImgOutterBox>
              <MyProductTitle>{item.name}</MyProductTitle>
              <ProductDescBox>
                <Rating name="simple-controlled" value={item.rate} />
                <ProductPrice as={"span"}>{item.price}</ProductPrice>
              </ProductDescBox>
            </MySlideWrap>
          </SwiperSlide>
        ))}
      </Swiper>
    </MySwiperWrap>
  );
};
export default Products;
