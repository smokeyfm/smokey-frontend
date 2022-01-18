import React from "react";
import { Facebook, Twitter, Instagram } from "@material-ui/icons";

import { SocialContainer, SocialList, SocialListItem, SocialIcon } from "./SocialLinks.styles";

export const SocialLinks = ({ isDark }: any) => {
  return (
    <>
      <SocialContainer isDark={isDark}>
        <SocialList>
          <SocialListItem isDark>
            <a href="http://www.instagram.com">
              {/* <SocialIcon src="images/social-icon-instagram.png" /> */}
              <Instagram />{" "}
            </a>
          </SocialListItem>

          <SocialListItem isDark>
            <a href="http://www.facebook.com">
              {/* <SocialIcon src="images/social-icon-facebook.png" />{" "} */}
              <Facebook />{" "}
            </a>
          </SocialListItem>

          <SocialListItem isDark>
            <a href="http://www.twitter.com">
              {/* <SocialIcon src="images/social-icon-twitter.png" />{" "} */}
              <Twitter />{" "}
            </a>
          </SocialListItem>
        </SocialList>
      </SocialContainer>
    </>
  );
};
