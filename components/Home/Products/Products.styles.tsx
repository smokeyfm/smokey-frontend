import styled from "@emotion/styled";
import { pxPC, pxIpone } from "../../../utils";
import { PriceText, ProductTitle, XlargeTitle, XsmallText } from "../../../styles/BaseStyles";
export const Title = styled(XlargeTitle)`
  margin-bottom: ${pxPC(26)};
  @media (max-width: 375px) {
    margin-bottom: ${pxIpone(19)};
  }
`;
export const MySwiperWrap = styled.div`
  margin-top: ${pxPC(26)};
  overflow: hidden;
  @media (max-width: 375px) {
    margin-top: ${pxIpone(19)};
  }
`;
export const MySlideWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const ProductImgOutterBox = styled.div`
  position: relative;
  width: 100%;
`;
export const ProductImg = styled.img`
  object-fit: cover;
  width: 100%;
`;
export const InfluencerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  right: ${pxPC(7.74)};
  bottom: ${pxPC(-30)};
`;
export const InfluencerAvatar = styled.img``;
export const InfluencerName = styled(XsmallText)`
  margin-top: ${pxPC(5)};
`;
export const MyProductTitle = styled(ProductTitle)`
  margin-top: ${pxPC(5.56)};
  align-self: flex-start;
`;
export const ProductDescBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${pxPC(31)};
  align-self: stretch;
`;
export const ProductPrice = styled(PriceText)``;
