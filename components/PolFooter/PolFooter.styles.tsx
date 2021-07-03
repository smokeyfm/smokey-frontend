import styled from "@emotion/styled";
import { pxPC } from "../../utils";
export const Container = styled.div`
  width: 100%;
  height: ${pxPC(400)};
  background: #000;
  padding-top: ${pxPC(41)};
`;
export const LogoDiv = styled.div`
  width: ${pxPC(181)};
  height: ${pxPC(45)};
  border: 1px solid #fff;
  color: #fff;
  font-size: ${pxPC(24)};
  line-height: ${pxPC(45)};
  font-weight: bold;
  font-family: Montserrat;
  text-align: center;
  margin: auto;
`;
export const InnerBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: ${pxPC(47)};
`;
export const ContactBox = styled.div``;
export const SocialLinksBox = styled.div`
  display: flex;
`;
export const SocialLink = styled.a``;
export const SocialIcon = styled.img`
  width: ${pxPC(10)};
  object-fit: contain;
  margin-right: ${pxPC(6)};
`;
export const InformationBox = styled.div``;
export const MyAccountBox = styled.div``;
export const AboutUsBox = styled.div`
  width: ${pxPC(173)};
`;
export const Title = styled.div`
  font-family: Bebas Neue;
  font-size: ${pxPC(14)};
  line-height: ${pxPC(17)};
  color: #fff;
  margin-bottom: ${pxPC(34)};
`;
export const LinkItem = styled.div`
  font-family: Bebas Neue;
  color: #969696;
  font-size: ${pxPC(14)};
  line-height: ${pxPC(17)};
  margin-bottom: ${pxPC(12)};
  white-space: pre-wrap;
`;
export const MyLink = styled.a`
  font-family: Bebas Neue;
  color: #969696;
  font-size: ${pxPC(14)};
  line-height: ${pxPC(17)};
  display: block;
  margin-bottom: ${pxPC(7)};
`;
