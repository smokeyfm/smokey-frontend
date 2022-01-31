import React from "react";
import styled from "@emotion/styled";
import { ClassNames } from "@emotion/react";
import { LayoutProps } from "./types";
import { Footer } from "../Footer/Footer";
import columns from "../Footer/footer.json";

import { Container, Content, Logo } from "./Layout.styles";


type LogoTypeFC = {
  imageFile: string;
  darkMode?: boolean;
};

export const MyLogo = ({ imageFile, darkMode }: LogoTypeFC) => (
  <Logo src={imageFile} darkMode={darkMode || false} />
  );
  
  export const Layout: React.FC<LayoutProps> = ({
    children
  }: {
    children: JSX.Element[] | JSX.Element;
  }) => {
  const darkMode = (process.env.IS_DARK_MODE === "true");
  return (
    <Container>
      <Content>
        {children}
        <ClassNames>
          {({ css, cx }) => (
            <Footer
              footerData={{
                logo: <MyLogo imageFile="/logo.png" darkMode={darkMode} />,
                columns
              }}
            />
          )}
        </ClassNames>
      </Content>
    </Container>
  );
};
