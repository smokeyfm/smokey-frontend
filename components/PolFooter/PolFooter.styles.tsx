import styled from "@emotion/styled";
import { pxIphone, pxPC } from "../../utils";
export const Container = styled.div`
  width: 100%;
  height: ${pxPC(400)};
  background: #000;
  padding-top: ${pxPC(41)};
  @media (max-width: 768px) {
    height: ${pxIphone(621)};
  }
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
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
export const ContactBox = styled.div`
  @media (max-width: 768px) {
    width: 45%;
  }
`;
export const SocialLinksBox = styled.div`
  display: flex;
`;
export const SocialLink = styled.a``;
export const SocialIcon = styled.img`
  width: ${pxPC(10)};
  object-fit: contain;
  margin-right: ${pxPC(6)};
`;
export const InformationBox = styled.div`
  @media (max-width: 768px) {
    width: 45%;
  }
`;
export const MyAccountBox = styled.div`
  @media (max-width: 768px) {
    width: 45%;
  }
`;
export const AboutUsBox = styled.div`
  width: ${pxPC(173)};
  @media (max-width: 768px) {
    width: 45%;
  }
`;
export const Title = styled.div`
  font-family: Bebas Neue;
  font-size: ${pxPC(14)};
  line-height: ${pxPC(17)};
  color: #fff;
  margin-bottom: ${pxPC(34)};
  @media (max-width: 768px) {
    color: #eb8b8b;
    font-size: ${pxIphone(14)};
    line-height: ${pxIphone(17)};
    margin-bottom: ${pxIphone(22)};
  }
`;
export const LinkItem = styled.div`
  font-family: Bebas Neue;
  color: #969696;
  font-size: ${pxPC(14)};
  line-height: ${pxPC(17)};
  margin-bottom: ${pxPC(12)};
  white-space: pre-wrap;
  @media (max-width: 768px) {
    font-size: ${pxIphone(14)};
    line-height: ${pxIphone(17)};
    margin-bottom: ${pxIphone(13)};
  }
`;
export const MyLink = styled.a`
  font-family: Bebas Neue;
  color: #969696;
  font-size: ${pxPC(14)};
  line-height: ${pxPC(17)};
  display: block;
  margin-bottom: ${pxPC(7)};
  @media (max-width: 768px) {
    font-size: ${pxIphone(14)};
    line-height: ${pxIphone(17)};
    margin-bottom: ${pxIphone(7)};
  }
`;
