import React, { Fragment } from "react";
import {
  Header,
  LogoDiv,
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
      <Header>
        <MySearchIcon />
        <HeaderAccount>MyAccount</HeaderAccount>
        <ArrowDown />
        <ShoppingCart />
        <FavoriteIcon />
      </Header>
      <LogoDiv>POL</LogoDiv>
    </Fragment>
  );
};
export default PageHeader;
