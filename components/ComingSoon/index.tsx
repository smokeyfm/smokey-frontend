import React from "react";

export const ComingSoon = () => {
  return (
    <>
      <div id="coming-soon-container">
        <img id="logo" src="Beeper-Logo-v3_@2x.png"></img>
        <div id="description">
          A NEW MOBILE MUSIC EXPERIENCE COMING TO A “WHERE EVER YOU ARE” NEAR
          YOU.
        </div>
      </div>

      <style jsx>
        {`
          #coming-soon-container {
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            width: auto;
            height: 600px;
          }
          #logo {
            width: auto;
            height: 240px;
            position: absolute;
          }
          #description {
            position: absolute;
            text-align: center;
            width: 425px;
            top: 400px;
            font-style: normal;
            font-weight: normal;
            font-size: 21.4598px;
            line-height: 28px;
            color: #ffffff;
          }

          /* HD/Retina CSS */
          @media only screen and (-webkit-min-device-pixel-ratio: 1.25),
            only screen and (min--moz-device-pixel-ratio: 1.25),
            only screen and (-o-min-device-pixel-ratio: 1.25/1),
            only screen and (min-device-pixel-ratio: 1.25),
            only screen and (min-resolution: 200dpi),
            only screen and (min-resolution: 1.25dppx) {
            #logo {
              /* what goes here */
            }
          }
        `}
      </style>
    </>
  );
};
