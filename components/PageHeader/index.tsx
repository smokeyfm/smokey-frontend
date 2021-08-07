import React, { Fragment } from "react";
import SearchBar from "../SearchBar";
import {
  Header,
  LogoDiv,
  LogoDivMo,
  UserIconMo,
  CartMo,
  SearchMo,
  HeaderAccount,
  ArrowDown,
  ShoppingCart,
  FavoriteIcon,
  MySearchIcon
} from "./PageHeader.styles";
export interface PageHeaderProps {}
const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <Fragment>
      <Header data-test={"hello"}>
        <LogoDivMo>POL</LogoDivMo>
        <SearchBar />
        <SearchMo src={"/searchMo.png"} />
        <CartMo src={"/CART.png"} />
        <UserIconMo src={"/user.png"} />
        <HeaderAccount>MyAccount</HeaderAccount>
        <ArrowDown />
        <ShoppingCart src={"/CART.png"} />
        <FavoriteIcon />
      </Header>
      <LogoDiv>POL</LogoDiv>
    </Fragment>
  );
};
export default PageHeader;
