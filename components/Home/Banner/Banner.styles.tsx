import styled from "@emotion/styled";
import { pxPC } from "../../../utils";
import ButtonBase from "@material-ui/core/ButtonBase";
import { XlargeTitle } from "../../../styles/BaseStyles";
export const BannerContainer = styled.div`
  position: relative;
  margin-top: ${pxPC(36)};
`;
export const BannerTitle = styled(XlargeTitle)``;
export const BannerImg = styled.img`
  object-fit: cover;
  min-width: 100%;
  margin-top: ${pxPC(30)};
`;
export const BannerBtn = styled(ButtonBase)`
  width: ${pxPC(228)};
  height: ${pxPC(35)};
  position: absolute !important;
  bottom: ${pxPC(43)};
  margin: auto !important;
  background-color: #eb8b8b !important;
  color: #fff !important;
  left: 0;
  right: 0;
  font-family: "Bebas Neue";
  font-size: ${pxPC(18)};
  line-height: ${pxPC(22)};
  text-align: center;
`;
