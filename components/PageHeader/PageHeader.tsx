import React, { Fragment } from "react";
import SearchBar from "../SearchBar";
import { menusData } from "../MainMenu/data/menusData";
import { MainMenu } from "../components";
import { pxIphone } from "../../utils";
import {
  Header,
  CustomIcon,
  MenuFooter,
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
      <Header>
        <LogoDivMo>POL</LogoDivMo>
        <SearchBar />
        <SearchMo src={"/searchMo.png"} />
        <CartMo src={"/CARTMo.png"} />
        <UserIconMo src={"/user.png"} />
        <HeaderAccount>MyAccount</HeaderAccount>
        <ArrowDown />
        <ShoppingCart />
        <FavoriteIcon />
      </Header>
      <LogoDiv>POL</LogoDiv>
      <MainMenu
        menuFooter={() => (
          <MenuFooter>
            <div>Privacy Policy - Terms & Conditions - RETURN POLICY</div>
            <div>All Materials Copyright © 2021 POL Clothing</div>
          </MenuFooter>
        )}
        showMenuHeader={true}
        customBurgerIcon={<CustomIcon src="/BURGER.png" />}
        pcMenuItemClassName="pc-menu-item"
        outterContainerId="outter-container"
        pageWrapId="page-wrap"
        animationType="slide"
        menusData={menusData}
        right={false}
      />
    </Fragment>
  );
};
export default PageHeader;
