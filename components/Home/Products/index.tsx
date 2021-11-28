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
  Title,
  ProductMask,
  MaskTitle,
  MyProductSubTitle,
  MyProductSubText,
  MaskTitleChecked
} from "./Products.styles";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { useMediaQuery } from "react-responsive";
export type product = {
  title: string;
  subTitle: string;
  subText: string;
  influencer: string;
  rate: number;
  viewer: string;
  img: string;
  avatar: string;
  status: number;
};
export interface ProductsProps {
  data: product[];
  title: string;
}
SwiperCore.use([Navigation, Thumbs]);
const Products: React.FC<ProductsProps> = (props) => {
  const { data, title } = props;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <MySwiperWrap>
      <Title>{title}</Title>
      <Swiper
        loop={true}
        spaceBetween={0}
        slidesPerView={isMobile ? 2 : 7}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <MySlideWrap>
              <ProductImgOutterBox>
                {item.status == 1 || item.status == 3 ? <ProductMask /> : null}
                {item.status == 1 ? (
                  <MaskTitleChecked>
                    StreamING LIVE &nbsp;&nbsp;&nbsp; 12 pm PST &nbsp;&nbsp;&nbsp; Check Back SOon
                  </MaskTitleChecked>
                ) : null}
                {item.status == 3 ? <MaskTitle>Stream Ended Watch Replay</MaskTitle> : null}
                <ProductImg src={item.img} alt={""} />
                <InfluencerBox>
                  <InfluencerAvatar src={item.avatar} />
                  <InfluencerName as={"span"}>{item.influencer}</InfluencerName>
                </InfluencerBox>
              </ProductImgOutterBox>
              <MyProductTitle>{item.title}</MyProductTitle>
              <ProductDescBox>
                {/* <Rating
                  size={isMobile ? "small" : "large"}
                  name="simple-controlled"
                  value={item.rate}
                />*/}
                <MyProductSubTitle>{item.subTitle}</MyProductSubTitle>
                <MyProductSubText>{item.subText}</MyProductSubText>
                <ProductPrice as={"span"}>{item.viewer + "  Viewers"}</ProductPrice>
              </ProductDescBox>
            </MySlideWrap>
          </SwiperSlide>
        ))}
      </Swiper>
    </MySwiperWrap>
  );
};
export default Products;
