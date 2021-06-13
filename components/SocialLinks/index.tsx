import React from "react";

// https://dribbble.com/shots/922852-Socialtograms
export const SocialLinks = () => {
  return (
    <div>
      <div id="social-container">
        <ul className="social-media-list">
          <li>
            <a href="http://www.twitter.com">
              <img src="twitter.png" />{" "}
            </a>
          </li>
          <li>
            <a href="http://www.instagram.com">
              <img src="instagram.png" />{" "}
            </a>
          </li>
          <li>
            <a href="http://www.facebook.com">
              <img src="fb.png" />{" "}
            </a>
          </li>
        </ul>
        <a  id="mailto" href="mailto:hey@beeper.buzz">
          Got Questions? We’d love to hear from you.
        </a>
      </div>

      <style jsx>
        {`
          #social-container {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 104px;
            top: 750px;
          }
          ul.social-media-list {
            padding-inline-start:0px;
          }
          ul.social-media-list li {
            display: inline-block;
          }
          ul.social-media-list img {
            height: 50px;
            width: 50px;
            padding: 5px;
          }
          #mailto {
            position: absolute;
            text-decoration: none;
            text-align: center;
            line-height: 19px;
            font-style: normal;
            font-weight: 200;
            font-size: 15px;
            bottom: 10px;
            color: #ffffff;
          }
        `}
      </style>
    </div>
  );
};

/*
position: absolute;
            text-align: center;
            width: 100%;
            font-style: normal;
            font-weight: 200;
            font-size: 15px;
            color: #ffffff; */
