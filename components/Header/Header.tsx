import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HeaderProps } from "./types";
import Sticky from "react-sticky-el";
import { useAuth } from "../../config/auth";
import SearchBar from "../SearchBar";
import styled from "@emotion/styled";

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
  padding: 30px 0px;
  background: black;
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
          {dummyCategories.map((category) => (
            <Link href="/" key={category}>
              <Category>{category}</Category>
            </Link>
          ))}
          <style jsx>{`
            .bottom-header {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              padding: 30px 0px;
              background: black;
            }
            .category {
              padding: 15px;
            }
            .bottom-header > :first-child {
              padding-left: 0px;
            }
            .bottom-header > :last-child {
              padding-right: 0px;
            }

            header {
              margin-bottom: 25px;
            }
            a {
              font-size: 14px;
              text-decoration: none;
            }
            .is-active {
              text-decoration: underline;
            }
          `}</style>
          <SearchBar />
        </BottomHeader>
      </Sticky>
    </HeaderDiv>
  );
};
