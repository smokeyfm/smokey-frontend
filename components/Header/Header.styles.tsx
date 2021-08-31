import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import styled from "@emotion/styled";
import { pxIphone } from "../../utils";

export const TopHeader = styled.div`
  padding: 10px 0 12px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const RightSide = styled.div`
  width: 33%;
  display: flex;
  position: absolute;
  top: 0;
  right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;
export const LogoDiv = styled.div`
  width: 180px;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  cursor: pointer;
`;
export const HeaderDiv = styled.header`
  z-index: 9;
`;

export interface LinkDivProps {
  isActive: boolean;
}

export const LinkDiv = styled.a<LinkDivProps>`
  font-size: 14px;
  text-decoration: none;
`;
export const BottomHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px;
  & > :first-child {
    padding-left: 0px;
  }
  & > :last-child {
    padding-right: 0px;
  }
`;
export const Category = styled.a`
  padding: 15px;
`;

export const HeaderAccount = styled.span`
  font-family: Roboto Condensed;
  font-size: 13px;
  line-height: 15px;
  color: #000;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const ArrowDown = styled(ArrowDropDownIcon)`
  margin-left: 5px;
  color: #000;
  @media (max-width: 768px) {
    display: none !important;
  }
`;
export const ShoppingCart = styled.img`
  width: 17px;
  height: auto;
  margin-left: 21px;
  margin-right: 13px;
  @media (max-width: 768px) {
    display: none !important;
  }
`;
export const FavoriteIcon = styled(FavoriteBorderIcon)`
  font-size: 12px;
  color: #000;
  margin-right: 13px;
  @media (max-width: 768px) {
    display: none !important;
  }
`;
export const UserIconMo = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: ${pxIphone(19)};
    height: auto;
    margin-right: ${pxIphone(12)};
  }
`;
export const CartMo = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: ${pxIphone(17)};
    height: auto;
    margin-right: ${pxIphone(15)};
  }
`;
export const CustomIcon = styled.img`
  width: ${pxIphone(37)};
  height: auto;
`;
