import React from "react";
import styled from "@emotion/styled";

export const SocialContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 104px;
  bottom: 0;
`;

export const SocialList = styled.ul`
  padding-inline-start: 0px;
`;
export const SocialListItem = styled.li`
  display: inline-block;
`;
export const SocialIcon = styled.img`
  height: 40px;
  width: 40px;
  padding: 5px;
`;

export const SocialLinks = () => {
  return (
    <>
      <SocialContainer>
        <SocialList>
          <SocialListItem>
            <a href="http://www.instagram.com">
              <SocialIcon src="images/social-icon-instagram.png" />
            </a>
          </SocialListItem>

          <SocialListItem>
            <a href="http://www.facebook.com">
              <SocialIcon src="images/social-icon-facebook.png" />{" "}
            </a>
          </SocialListItem>

          <SocialListItem>
            <a href="http://www.twitter.com">
              <SocialIcon src="images/social-icon-twitter.png" />{" "}
            </a>
          </SocialListItem>
        </SocialList>
      </SocialContainer>
    </>
  );
};
