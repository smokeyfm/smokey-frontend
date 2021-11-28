import React from "react";
import { NotifyForm, SocialLinks } from "../components";
import { Container, Logo, Text } from "./ComingSoon.styles";

export const ComingSoon = () => {
  return (
    <>
      <Container>
        <Logo src="LOGO.png" />
        <Text>Coming Soon</Text>
        <NotifyForm />
        <SocialLinks />
      </Container>
    </>
  );
};
