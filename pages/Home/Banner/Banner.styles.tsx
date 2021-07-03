import styled from "@emotion/styled";
import { LargeTitle, BtnTitle } from "../../../styles/BaseStyles";
import ButtonBase from "@material-ui/core/ButtonBase";
import { pxPC } from "../../../utils";
export const Container = styled.div`
  height: ${pxPC(719)};
  background-image: url(/banner.png);
  background-size: cover;
  position: relative;
`;
export const BannerTitle = styled(LargeTitle)`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: ${pxPC(296)};
  top: ${pxPC(183)};
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
`;
