import styled from "@emotion/styled";
import { Badge, Popover } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { pxIphone } from "../../utils";

export const TopHeader = styled.div`
  padding: 10px 0 12px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: ${(p) => p.theme.breakpoints.values.sm}px) {
    height: 30px;
  }
`;

export const LogoDiv = styled.div`
  width: 355px;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  &:hover {
    color: ${p => p.theme.colors.brand.primary};
  }
`;

export const BottomHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px;
  & > :first-of-type {
    padding-left: 0px;
  }
  & > :last-child {
    padding-right: 0px;
  }
`;

export const Category = styled.a`
  padding: 15px;
`;

export const LeftSide = styled.div`
  width: auto;
  display: flex;
  position: absolute;
  top: 0;
  left: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;

  @media (max-width: ${(p) => p.theme.breakpoints.values.sm}px) {
    justify-content: flex-end;
  }
`;

export const RightSide = styled.div`
  width: auto;
  display: flex;
  position: absolute;
  top: 0;
  right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;

  @media (max-width: ${(p) => p.theme.breakpoints.values.sm}px) {
    justify-content: flex-end;
  }
`;

export const HeaderOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 20px;
  justify-content: space-around;
  & > a {
    margin: 0 10px;
    font-family: ${(p) => p.theme.typography.titleMD.fontFamily};
    font-size: ${(p) => p.theme.typography.titleMD.fontSize};
    font-weight: ${(p) => p.theme.typography.titleMD.fontWeight};
    line-height: ${(p) => p.theme.typography.titleMD.lineHeight};
    color: ${(p) => p.theme.typography.titleMD.color};
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CartToggle = styled.div`
  margin: 10px 10px 0 0;
`;

export const HeaderAccount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 20px;
  justify-content: space-around;
  color: #000;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const AccountEmail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

export const AccountMenu = styled(Popover)`
  padding: 20px 10px;
  border: 1px solid red;
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

export const CameraIcon = styled.img`
  width: 11px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 20.71px;
    height: auto;
    margin-right: 7.76px;
  }
`;
export const FacebookIcon = styled.img`
  width: 6.81px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 13.63px;
    height: auto;
    margin-right: 7.76px;
  }
`;
export const PlayIcon = styled.img`
  width: 12.29px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 24.59px;
    height: auto;
    margin-right: 7.76px;
  }
`;
export const CircleIcon = styled.img`
  width: 10.35px;
  height: auto;
  @media (max-width: 375px) {
    width: 20.71px;
    height: auto;
  }
`;
