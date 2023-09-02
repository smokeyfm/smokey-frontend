import React from "react";
import { NotifyForm, SocialLinks } from "../../components";
import { Container, Logo, Text } from "./ComingSoon.styles";

export const ComingSoon = () => {
  const mailChimpUrl = `${process.env.MAILCHIMP_URL}?u=${process.env.MAILCHIMP_ID}&id=${process.env.MAILCHIMP_U}`;
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
