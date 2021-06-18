import React from "react";
import Proptypes from "prop-types";
import styled from '@emotion/styled'
import { FooterProps, Link } from "./types/interfaces/FooterProps";

const Container=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LinksWrapper=styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const LegalWrap=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 300px;
  font-size: 30px;
`
const LegalTitle=styled.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 50px;
`
const ContactWrap=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 300px;
  font-size: 30px;
`
const ContactTitle=styled.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 50px;
`
const SocialWrap=styled.div`
  display: flex;
  flex-direction: column;
  font-size: 30px;
`
const SocialTitle=styled.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 50px;
`
const LinkItem=styled.div`
  margin-bottom: 20px;
  color: #000;
  & a {
    color: #000;
  }
`
const CopyRight=styled.div`
  margin-top: 100px;
`
export const Footer = (props: FooterProps) => {
  const { links, showLegal, showContact, showSocial, styles } = props;
  let legals: Link[] = [];
  let contacts: Link[] = [];
  let socials: Link[] = [];
  links.forEach((link: Link) => {
    if (link.type == "legal") {
      legals.push(link);
    } else if (link.type == "contact") {
      contacts.push(link);
    } else if (link.type == "social") {
      socials.push(link);
    }
  });
  return (
    <Container style={styles}>
      <LinksWrapper>
        {showLegal && legals.length !== 0 && (
          <LegalWrap>
            <LegalTitle>Legal Links</LegalTitle>
            {legals.map((item, index) => {
              return (
                <LinkItem key={index}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    {item.text}
                  </a>
                </LinkItem>
              );
            })}
          </LegalWrap>
        )}
        {showContact && contacts.length !== 0 && (
          <ContactWrap>
            <ContactTitle>Contact Links</ContactTitle>
            {contacts.map((item, index) => {
              return (
                <LinkItem key={index}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    {item.text}
                  </a>
                </LinkItem>
              );
            })}
          </ContactWrap>
        )}
        {showSocial && socials.length !== 0 && (
          <SocialWrap>
            <SocialTitle>Social Links</SocialTitle>
            {socials.map((item, index) => {
              return (
                <LinkItem key={index}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    {item.text}
                  </a>
                </LinkItem>
              );
            })}
          </SocialWrap>
        )}
      </LinksWrapper>
      <CopyRight>© All Rights Reserved by Material Instincts DNA</CopyRight>
    </Container>
  );
};

Footer.propTypes = {
  links: Proptypes.arrayOf(Proptypes.object),
  showLegal: Proptypes.bool,
  showContact: Proptypes.bool,
  showSocial: Proptypes.bool,
  styles: Proptypes.object
};
Footer.defaultProps = {
  links: [],
  showLegal: true,
  showContact: true,
  showSocial: true,
  styles: {}
};
