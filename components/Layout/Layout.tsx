import React from "react";
import { LayoutProps } from "./types";
import styled from "@emotion/styled";
import PolFooter from "../PolFooter";
import FooterData from "./footer.json";
const Main = styled.main`
  flex: 1;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Layout: React.FC<LayoutProps> = ({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <Main>
      {children}
      <PolFooter data={FooterData} />
    </Main>
  );
};
