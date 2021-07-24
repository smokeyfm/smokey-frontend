import styled from "@emotion/styled";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { pxIpone } from "../../utils";
export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 14px;
  @media (max-width: 768px) {
    height: ${pxIpone(60)};
    margin-top: 0;
  }
`;
export const LogoDiv = styled.div`
  margin: 46px auto 0 auto;
  width: 181px;
  height: 45px;
  border: 0.67px solid #000;
  text-align: center;
  line-height: 45px;
  color: #000;
  font-weight: bold;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const LogoDivMo = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    margin-left: ${pxIpone(60)};
    margin-right: auto;
    width: ${pxIpone(110)};
    height: ${pxIpone(31)};
    border: 0.5px solid #000;
    text-align: center;
    color: #000;
    line-height: ${pxIpone(31)};
    font-weight: bold;
    font-size: 17px;
  }
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
export const MySearchIcon = styled(SearchIcon)`
  color: #000;
  @media (max-width: 768px) {
    display: none !important;
  }
`;
export const UserIconMo = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: ${pxIpone(19)};
    height: auto;
    margin-right: ${pxIpone(12)};
  }
`;
export const CartMo = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: ${pxIpone(17)};
    height: auto;
    margin-right: ${pxIpone(15)};
  }
`;
export const SearchMo = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: ${pxIpone(14)};
    height: auto;
    margin-right: ${pxIpone(15)};
  }
`;
