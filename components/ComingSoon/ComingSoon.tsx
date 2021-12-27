import React from "react";
import { NotifyForm, SocialLinks } from "../components";
import { Container, Logo, Text } from "./ComingSoon.styles";

export const ComingSoon = () => {
  return (
    <>
      <Container>
        <Logo src="logo-tagline.svg" />
        <Text>{process.env.COMING_SOON_COPY}</Text>
        <NotifyForm />
        {/* <SocialLinks /> */}
      </Container>
    </>
  );
};
