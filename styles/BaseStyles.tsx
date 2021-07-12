import styled from "@emotion/styled";
import { pxIpone, pxPC } from "../utils";
export const ProductTitle = styled.div`
  font-size: ${pxPC(16)};
  line-height: ${pxPC(20)};
  color: #000000;
  font-family: "Bebas Neue";
  text-align: left;
`;
export const PriceText = styled.div`
  font-size: ${pxPC(16)};
  line-height: ${pxPC(20)};
  color: #000000;
  font-family: "Bebas Neue";
  text-align: center;
`;
export const Title = styled.div`
  font-size: ${pxPC(18)};
  color: #000;
  line-height: ${pxPC(22)};
  text-align: center;
  font-family: "Bebas Neue";
`;
export const BigTitle = styled.div`
  font-family: "Montserrat";
  font-size: ${pxPC(24)};
  line-height: ${pxPC(30)};
  font-weight: bold;
  text-align: center;
  color: #000;
`;
export const LargeTitle = styled.div`
  font-family: "Bebas Neue";
  font-size: ${pxPC(39)};
  line-height: ${pxPC(38)};
  text-align: center;
  color: #000;
`;
export const XlargeTitle = styled.div`
  font-family: "Bebas Neue";
  font-size: ${pxPC(44)};
  line-height: ${pxPC(54)};
  text-align: center;
  color: #000;
  @media (max-width: 375px) {
    font-size: ${pxIpone(24)};
    line-height: ${pxIpone(29)};
  }
`;
export const BtnTitle = styled.div`
  font-family: "Bebas Neue";
  font-size: ${pxPC(18)};
  line-height: ${pxPC(22)};
  color: #fff;
  text-align: center;
`;
export const WhiteTitle = styled.div`
  font-size: ${pxPC(14)};
  line-height: ${pxPC(17)};
  color: #fff;
`;
export const BigWhiteTitle = styled.div`
  font-family: "Montserrat";
  font-size: ${pxPC(24)};
  line-height: ${pxPC(30)};
  text-align: center;
  letter-spacing: 0.89em;
  color: #fff;
  font-weight: bold;
`;
export const XsmallText = styled.div`
  font-family: "Roboto";
  font-size: ${pxPC(6)};
  line-height: ${pxPC(8)};
  color: #000;
  text-align: center;
`;
export const WhiteText = styled.div`
  font-size: ${pxPC(14)};
  line-height: ${pxPC(17)};
  color: #969696;
  font-family: "Bebas Neue";
`;
export const DescText = styled.div`
  font-size: ${pxPC(16)};
  line-height: ${pxPC(19)};
  font-weight: 300;
  color: #000;
  font-family: "Roboto";
`;
export const SubText = styled.div`
  font-size: ${pxPC(18)};
  line-height: ${pxPC(21)};
  color: #5c5c5c;
  font-family: Roboto;
`;
