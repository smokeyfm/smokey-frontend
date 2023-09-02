import React from "react";
import styled from "@emotion/styled";
import { ClassNames } from "@emotion/react";
import { LayoutProps } from "./types";
import { Footer } from "../Footer/Footer";
import columns from "../Footer/footer.json";

import { Container, Content, Logo } from "./Layout.styles";

type LogoTypeFC = {
  imageFile: string;
  isDark?: boolean;
};

export const MyLogo = ({ imageFile, isDark }: LogoTypeFC) => (
  <Logo src={imageFile} isDark={isDark || false} />
);

export const Layout: React.FC<LayoutProps> = ({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <Container>
      <Content>
        {children}
        <ClassNames>
          {({ css, cx }) => (
            <Footer
              footerData={{
                logo: <MyLogo imageFile="/logo.png" isDark={false} />,
                columns
              }}
            />
          )}
        </ClassNames>
      </Content>
    </Container>
  );
};
