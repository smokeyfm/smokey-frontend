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
              SIGN UP
            </Button>
          </form>
        </FormWrapper>
        <MailTo id="mailto" href="mailto:hey@beeper.buzz">
          Got Questions? We’d love to hear from you.
        </MailTo>
      </Container>
    </>
  );
};
