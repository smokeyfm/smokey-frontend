import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HeaderProps } from "./types";
import { useAuth } from "../../config/auth";
import SearchBar from "../SearchBar";
import styled from "@emotion/styled";
import { Cart } from "../Cart/Cart";

const TopHeader = styled.div`
  padding: 30px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RightSide = styled.div`
  width: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LogoDiv = styled.div`
  padding: 15px 30px;
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeaderDiv = styled.header`
  margin-bottom: 25px;
`;
export interface LinkDivProps {
  isActive: boolean;
}
const LinkDiv = styled.a<LinkDivProps>`
  font-size: 14px;
  text-decoration: ${(props) => (props.isActive ? "underline" : "none")};
`;
const BottomHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 0px;
  & > :first-child {
    padding-left: 0px;
  }
  & > :last-child {
    padding-right: 0px;
  }
`;
const Category = styled.a`
  padding: 15px;
`;
const dummyCategories = ["Best Sellers", "Latest", "Seasonal", "Luxury", "On Sale", "Coming Soon"];

export const Header: React.FC<HeaderProps> = (props) => {
  const { pathname } = useRouter();
  const { user, logout } = useAuth();
  const [cartVisible, setCartVisible] = React.useState(false);
  const toggleCart = () => setCartVisible((isVisible) => !isVisible);

  return (
    <HeaderDiv>
      <TopHeader>
        <div />
        <LogoDiv>
          <Link href="/">
            <LinkDiv isActive>LOGO</LinkDiv>
          </Link>
        </LogoDiv>
        <div>
          <RightSide>
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
        <SearchBar />
      </BottomHeader>
    </HeaderDiv>
  );
};
