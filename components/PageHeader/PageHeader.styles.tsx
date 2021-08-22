import styled from "@emotion/styled";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { pxIphone } from "../../utils";
export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 768px) {
    height: ${pxIphone(60)};
    margin-top: 0;
  }
`;
export const LogoDiv = styled.div`
  margin: 14px auto 35px auto;
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
    margin-left: ${pxIphone(60)};
    margin-right: auto;
    width: ${pxIphone(110)};
    height: ${pxIphone(31)};
    border: 0.5px solid #000;
    text-align: center;
    color: #000;
    line-height: ${pxIphone(31)};
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
export const SearchMo = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: ${pxIphone(14)};
    height: auto;
    margin-right: ${pxIphone(15)};
  }
`;
