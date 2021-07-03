import styled from "@emotion/styled";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 14px;
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
`;
export const HeaderAccount = styled.span`
  font-family: Roboto;
  font-size: 13px;
  line-height: 15px;
  color: #000;
`;
export const ArrowDown = styled(ArrowDropDownIcon)`
  margin-left: 5px;
  color: #000;
`;
export const ShoppingCart = styled(ShoppingCartIcon)`
  color: #000;
  font-size: 10px;
`;
export const FavoriteIcon = styled(FavoriteBorderIcon)`
  font-size: 12px;
  color: #000;
`;
export const MySearchIcon = styled(SearchIcon)`
  color: #000;
`;
