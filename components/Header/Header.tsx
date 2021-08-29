import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Sticky from "react-sticky-el";
import { HeaderProps } from "./types";
import { useAuth } from "../../config/auth";
import SearchBar from "../SearchBar";
import { MainMenu } from "../MainMenu";
import { menusData } from "../MainMenu/data/menusData";
import { Cart } from "../Cart/Cart";

import {
  TopHeader,
  RightSide,
  LogoDiv,
  HeaderDiv,
  LinkDiv,
  BottomHeader,
  Category
} from "./Header.styles";

const dummyCategories = ["Best Sellers", "Latest", "Seasonal", "Luxury", "On Sale", "Coming Soon"];

export const Header: React.FC<HeaderProps> = (props) => {
  const { pathname } = useRouter();
  const { user, logout } = useAuth();
  const [cartVisible, setCartVisible] = React.useState(false);
  const toggleCart = () => setCartVisible((isVisible) => !isVisible);

  if (process.env.IS_MAINT_MODE !== "true") {
    return (
      <HeaderDiv>
        <TopHeader>
          <LogoDiv>
            <Link href="/">
              <LinkDiv isActive>POL</LinkDiv>
            </Link>
          </LogoDiv>
          <div>
            <RightSide>
              <SearchBar />
              {user ? (
                <>
                  <div>{user.data.attributes.email}</div>
                  <button onClick={logout}>LOGOUT</button>
                </>
              ) : (
                <>
                  <Link href="/authenticate/login">
                    <LinkDiv isActive={pathname === "/authenticate/login"}>LOG IN</LinkDiv>
                  </Link>
                  <Link href="/authenticate/signup">
                    <LinkDiv isActive={pathname === "/authenticate/signup"}>SIGN UP</LinkDiv>
                  </Link>
                </>
              )}
              <Cart isVisible={cartVisible} toggle={toggleCart} />
            </RightSide>
          </div>
        </TopHeader>
        <BottomHeader>
          <Sticky>
            <MainMenu
              pcMenuItemClassName={"pc-menu-item"}
              outterContainerId={"outer-container"}
              pageWrapId={"page-wrap"}
              animationType={"slide"}
              menusData={menusData}
              showMenuHeader={true}
              menuFooter={false}
              right={false}
            />
          </Sticky>
        </BottomHeader>
      </HeaderDiv>
    );
  }

  return null;
};
