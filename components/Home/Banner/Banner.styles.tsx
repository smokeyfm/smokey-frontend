import styled from "@emotion/styled";
import { LargeTitle, BtnTitle } from "../../../styles/BaseStyles";
import ButtonBase from "@material-ui/core/ButtonBase";
import { pxIphone, pxPC } from "../../../utils";
export const Container = styled.div`
  height: ${pxPC(719)};
  background-image: url(/banner.png);
  background-size: cover;
  position: relative;
  @media (max-width: 768px) {
    height: calc(100vh - ${pxIphone(60)});
    background-image: url("/bannerMo.png");
  }
`;
export const BannerTitle = styled(LargeTitle)`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: ${pxPC(296)};
  top: ${pxPC(183)};
  @media (max-width: 768px) {
    top: ${pxIphone(47)};
    left: ${pxIphone(0)};
    font-size: ${pxIphone(33)};
    line-height: ${pxIphone(41)};
  }
`;
export const BannerBtn = styled(ButtonBase)`
  width: ${pxPC(237)};
  height: ${pxPC(37)};
  background: #eb8b8b !important;
  margin-top: ${pxPC(22)}!important;
  color: #fff !important;
  font-family: "Bebas Neue";
  font-size: ${pxPC(18)};
  line-height: ${pxPC(22)};
  color: #fff;
  text-align: center;
  @media (max-width: 768px) {
    width: 50vw;
    height: ${pxIphone(31)};
    font-size: ${pxIphone(20)};
    line-height: ${pxIphone(24)};
    margin-top: ${pxIphone(10)}!important;
    padding: ${pxIphone(6)} ${pxIphone(20)} !important;
    margin-left: ${pxIphone(24)}!important;
  }
`;
