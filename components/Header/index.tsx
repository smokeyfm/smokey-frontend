import React from "react";
import { useRouter } from "next/router";
import styled from '@emotion/styled';
import Link from "next/link";
import { param } from "jquery";
const HeaderMargin= styled.header`
margin-bottom: 25px;
`
const AnchorTag = styled.a(
  {
    fontSize: 20,
    marginRight:15,
    textDecoration:'none',
    cursor:'pointer'
  },
  props => ({ textDecoration: props.color })
)
export const Header = () => {
  const { pathname } = useRouter();

  return (
    <HeaderMargin>
      <Link href="/">
        <AnchorTag color={pathname === "/" ? "underline":"" }>Home</AnchorTag>
      </Link>
      <Link href="/client-only">
        <AnchorTag color= {pathname === "/client-only" ?"underline":"" }>
          Client-Only
        </AnchorTag>
      </Link>
    </HeaderMargin>
  );
};
