import React, { useState } from "react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted!");
    setEmail("");
  };

  return (
    <div>
      <div id="container">
        <div id="notify">GET NOTIFIED</div>
        <form onSubmit={handleSubmit}>
          <input
            id="email-input"
            type="text"
            placeholder="EMAIL"
            value={email}
            name="text"
            onChange={handleChange}
          />
          <button type="submit">SIGN UP</button>
        </form>
      </div>
      <style jsx>
        {`
          #container {
            position: absolute;
            display: flex;
            align-itmes: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
          #notify {
            position: absolute;
            text-align: center;
            width:100%;
            font-style: normal;
            font-weight: 200;
            font-size: 15px;
            line-height: 19px;
            color: #ffffff;
          }
          #email-input {
            position: absolute;
            width: 201px;
            height: 36.15px;
            top: 40px;

            background: #eccfed;
            box-shadow: -2.89209px -2.89209px 14.4604px rgba(144, 0, 147, 0.7),
              2.89209px 2.89209px 14.4604px #000000,
              inset 0px 0.723022px 7.95324px #1a0300;
            border-radius: 36.1511px;
          }
          button {
            position: absolute;
            width: 201px;
            top: 90px;
            height: 36.15px;
            background: #430098;
            border: 1.89432px solid rgba(255, 0, 138, 0.15);
            box-sizing: border-box;
            box-shadow: -6.76748px -6.76748px 27.0772px rgba(144, 0, 147, 0.7),
              6.76871px 6.76748px 27.0749px #000000,
              inset 2.70748px 2.70748px 20.3061px #1a0300;
            border-radius: 36.1511px;
          }
        `}
      </style>
    </div>
  );
};
