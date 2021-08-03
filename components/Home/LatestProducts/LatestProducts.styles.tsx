import styled from "@emotion/styled";
import { pxPC } from "../../../utils";
import { XlargeTitle } from "../../../styles/BaseStyles";
import { ButtonBase } from "@material-ui/core";
export const Container = styled.div`
  margin-top: ${pxPC(30)};
`;
export const Title = styled(XlargeTitle)``;
export const ProductsBox = styled.div`
  margin-top: ${pxPC(30)};
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ProductItem = styled.div`
  width: 49%;
  position: relative;
  margin-bottom: ${pxPC(20)};
`;
export const ProductImg = styled.img`
  object-fit: cover;
  width: 100%;
`;
export const ProductBtn = styled(ButtonBase)`
  background: #eb8b8b !important;
  width: ${pxPC(234)};
  height: ${pxPC(36)};
  position: absolute !important;
  bottom: ${pxPC(84)};
  left: 0;
  right: 0;
  margin: auto !important;
  color: #fff !important;
  font-family: "Bebas Neue";
  font-size: ${pxPC(18)};
  line-height: ${pxPC(22)};
  color: #fff;
  text-align: center;
`;
