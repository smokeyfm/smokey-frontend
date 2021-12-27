import React, { useState } from "react";

import {
  Container,
  NotifyText,
  FormWrapper,
  EmailInput,
  Button,
  MailTo
} from "./NotifyForm.styles";

export const NotifyForm = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event: any) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Submitted!");
    setEmail("");
  };

  return (
    <>
      <defs>
        <rect id="rect" x="25%" y="25%" width="50%" height="50%" rx="15" />
        <clipPath id="clip">
          <use xlinkHref="#rect" />
        </clipPath>
      </defs>
      <Container>
        <NotifyText>GET NOTIFIED</NotifyText>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <EmailInput
              id="email-input"
              type="text"
              placeholder="EMAIL"
              value={email}
              name="text"
              onChange={(e) => handleChange(e)}
            />
            <Button id="signup-button" type="submit">
              GET UPDATES
            </Button>
          </form>
        </FormWrapper>
        <MailTo id="mailto" href={`mailto:${process.env.CONTACT_EMAIL}`}>
          Got Questions? We’d love to hear from you.
        </MailTo>
      </Container>
    </>
  );
};
