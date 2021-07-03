import React, { useCallback } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { MemberName, MyAvatar, MySwiperContainer, MySlideWrap } from "./MemberList.styles";
export type member = { name: string; avatar: string };
export interface MemberListProps {
  data: member[];
}
SwiperCore.use([Navigation]);
const MemberList: React.FC<MemberListProps> = (props) => {
  const { data } = props;
  const onSwipe = useCallback((swipe) => {}, []);
  return (
    <MySwiperContainer>
      <Swiper onSwiper={onSwipe} loop={true} spaceBetween={1} slidesPerView={7}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <MySlideWrap>
              <MyAvatar src={item.avatar} />
              <MemberName>{item.name}</MemberName>
            </MySlideWrap>
          </SwiperSlide>
        ))}
      </Swiper>
    </MySwiperContainer>
  );
};
export default MemberList;
