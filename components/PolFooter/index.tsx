import React from "react";
import {
  AboutUsBox,
  ContactBox,
  Container,
  InformationBox,
  InnerBox,
  LinkItem,
  LogoDiv,
  MyAccountBox,
  MyLink,
  SocialLinksBox,
  Title,
  SocialLink,
  SocialIcon
} from "./PolFooter.styles";
export type Link = {
  url: string;
  text: string;
};
export type SocialLink = {
  icon: string;
  url: string;
};
export type FooterData = {
  contactInfo: {
    company: string;
    phone: string;
    website: string;
  };
  information: Link[];
  myaccount: Link[];
  aboutus: Link[];
  socials: SocialLink[];
};
export interface PolFooterProps {
  data: FooterData;
}
const PolFooter: React.FC<PolFooterProps> = (props) => {
  const { data } = props;
  const { contactInfo, information, myaccount, aboutus, socials } = data;
  const { company, phone, website } = contactInfo;
  return (
    <Container>
      <LogoDiv>POL</LogoDiv>
      <InnerBox>
        <ContactBox>
          <Title>CONTACT INFO</Title>
          <LinkItem>{company}</LinkItem>
          <LinkItem>{phone}</LinkItem>
          <LinkItem>{website}</LinkItem>
          <SocialLinksBox>
            {socials.map((item, index) => (
              <SocialLink key={index} href={item.url}>
                <SocialIcon src={item.icon}></SocialIcon>
              </SocialLink>
            ))}
          </SocialLinksBox>
        </ContactBox>
        <InformationBox>
          <Title>INFORMATION</Title>
          {information.map((item, index) => (
            <MyLink key={index} href={item.url}>
              {item.text}
            </MyLink>
          ))}
        </InformationBox>
        <MyAccountBox>
          <Title>MY ACCOUNT</Title>
          {myaccount.map((item, index) => (
            <MyLink key={index} href={item.url}>
              {item.text}
            </MyLink>
          ))}
        </MyAccountBox>
        <AboutUsBox>
          <Title>ABOUT US</Title>
          {aboutus.map((item, index) => (
            <MyLink key={index} href={item.url}>
              {item.text}
            </MyLink>
          ))}
        </AboutUsBox>
      </InnerBox>
    </Container>
  );
};
export default PolFooter;
