import React from "react";
import { BannerBtn, BannerTitle, Container } from "./Banner.styles";
export interface BannerProps {}
const Banner: React.FC<BannerProps> = (props) => {
  return (
    <Container>
      <BannerTitle>
        <span>BROWE ALL THE NEW</span>
        <span>SPRING/ SUMMER LOOKS</span>
        <BannerBtn>SHOW ME</BannerBtn>
      </BannerTitle>
    </Container>
  );
};
export default Banner;
