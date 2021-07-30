import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HeaderProps } from "./types";
import Sticky from "react-sticky-el";
import { useAuth } from "../../config/auth";
import SearchBar from "../SearchBar";
import { MainMenu } from "../MainMenu";
import { menusData } from "../MainMenu/data/menusData";

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

  return (
    <HeaderDiv>
      <TopHeader>
        <Link href="/">
          <LinkDiv isActive={pathname === "/"}>Home</LinkDiv>
        </Link>
        <LogoDiv>
          <Link href="/">
            <LinkDiv isActive>LOGO</LinkDiv>
          </Link>
        </LogoDiv>
        <>
          {user ? (
            <RightSide>
              <div>{user.data.attributes.email}</div>
              <button onClick={logout}>LOGOUT</button>
            </RightSide>
          ) : (
            <RightSide>
              <Link href="/authenticate/login">
                <LinkDiv isActive={pathname === "/authenticate/login"}>LOG IN</LinkDiv>
              </Link>
              <Link href="/authenticate/signup">
                <LinkDiv isActive={pathname === "/authenticate/signup"}>SIGN UP</LinkDiv>
              </Link>
            </RightSide>
          )}
        </>
      </TopHeader>
      <Sticky>
        <BottomHeader>
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
          <SearchBar />
        </BottomHeader>
      </Sticky>
    </HeaderDiv>
  );
};
