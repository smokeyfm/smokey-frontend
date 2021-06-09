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
      <div id="newsletter-container">
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
          <button id="signup-button" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
      <style jsx>
        {`
          #newsletter-container {
            display: flex;
            position: absolute;
            justify-content: center;
            align-itmes: center;
            width: 95%;
          }
          #notify {
            position: absolute;
            text-align: center;
            width: 100%;
            font-style: normal;
            font-weight: 200;
            font-size: 15px;
            line-height: 19px;
            color: #ffffff;
          }
          #email-input {
            position: absolute;
            text-align: center;
            width: 201px;
            height: 36.15px;
            top: 40px;
            margin-left: -100px;
            background: #eccfed;
            border: 1.89432px solid rgba(255, 0, 138, 0.15);
            box-sizing: border-box;
            box-shadow: -6.76748px -6.76748px 27.0772px rgba(144, 0, 147, 0.7),
              6.76871px 6.76748px 27.0749px #000000,
              inset 2.70748px 2.70748px 20.3061px #1a0300;
            border-radius: 36.1511px;
          }
          ::placeholder {
            color: #ce8dd0;
          }
          #signup-button {
            position: absolute;
            color: #ce8dd0;
            text-align: center;
            width: 201px;
            top: 90px;
            height: 36.15px;
            margin-left: -100px;
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
