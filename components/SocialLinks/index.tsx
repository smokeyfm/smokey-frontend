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
        <a id="mailto" href="mailto:hey@beeper.buzz ">Got Questions? We’d love to hear from you.</a>
      </div>

      <style jsx>
        {`
          #social-container {
            position: absolute;
            display: flex;
            justify-content: center;
            align-itmes: center;
            width: 100%;
            height: 50px;
            top: 800px;
          }
          ul.social-media-list img {
            height: 50px;
            width: 50px;
            padding: 5px;
          }
          ul.social-media-list {
            list-style-type: none;
            margin-left: -60px;
            padding: 0;
            position: absolute;
            bottom: 0;
          }
          ul.social-media-list li {
            display: inline-block;
          }
          #mailto{
            position: absolute;
            padding-top: 20px;
            text-decoration: none;
            text-align: center;
            color: #2b1866;
          }
        `}
      </style>
    </div>
  );
};
