import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
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
} from "./StreamList.styles";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { useMediaQuery } from "react-responsive";
import { IStream } from "../../../typings/stream";
export interface StreamListProps {
  data: IStream[];
  title: string;
}
SwiperCore.use([Navigation, Thumbs]);
export const StreamList: React.FC<StreamListProps> = (props) => {
  const { data, title } = props;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const router = useRouter();

  const handleClick = (i: any) => {
    console.log(i);
    router.push(`/stream/${i}`);
  };

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
        {data &&
          data.map((item, index) => {
            const startDate = moment(item.start_date);
            const today = moment();
            const isPast = today.isAfter(startDate);
            console.log(item.playback_ids[0]);
            return (
              <SwiperSlide key={index}>
                <MySlideWrap onClick={() => (isPast ? handleClick(item.playback_ids[0]) : null)}>
                  <ProductImgOutterBox>
                    {!isPast ? <ProductMask /> : null}
                    {!isPast ? (
                      <MaskTitleChecked>
                        {isPast ? "Streamed" : "Streaming"} Soon &nbsp;&nbsp;&nbsp;{" "}
                        {moment(item.start_date).fromNow()} &nbsp;&nbsp;&nbsp; Check Back Soon
                      </MaskTitleChecked>
                    ) : null}
                    {isPast ? <MaskTitle>Stream Ended Watch Replay</MaskTitle> : null}
                    <ProductImg src="/3.png" alt={""} />
                    <InfluencerBox>
                      <InfluencerAvatar src="/1.png" />
                      <InfluencerName as={"span"}>Jane Doe</InfluencerName>
                    </InfluencerBox>
                  </ProductImgOutterBox>
                  <MyProductTitle>{item.title}</MyProductTitle>
                  <MyProductTitle>{item.description}</MyProductTitle>
                </MySlideWrap>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </MySwiperWrap>
  );
};
