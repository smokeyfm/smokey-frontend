import React from "react";
import { NotifyForm, SocialLinks } from "../../components";
import { Container, Logo, Text } from "./ComingSoon.styles";

export const ComingSoon = () => {
  return (
    <>
      <Container>
        <Logo src="logo-tagline.svg" />
        <Text>A NEW MOBILE MUSIC EXPERIENCE COMING TO A “WHERE EVER YOU ARE” NEAR YOU.</Text>
        <NotifyForm />
        <SocialLinks />
      </Container>
    </>
  );
};
