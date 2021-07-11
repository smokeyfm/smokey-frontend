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
import { useMediaQuery } from "react-responsive";
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
  title:string;
}
SwiperCore.use([Navigation, Thumbs]);
const Products: React.FC<ProductsProps> = (props) => {
  const { data,title } = props;
  const isMobile=useMediaQuery({maxWidth:767})
  return (
    <MySwiperWrap>
      <Title>{title}</Title>
      <Swiper
        loop={true}
        spaceBetween={10}
        slidesPerView={isMobile? 2:7}
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
                <Rating size={isMobile ? 'small' :'large'} name="simple-controlled" value={item.rate} />
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
