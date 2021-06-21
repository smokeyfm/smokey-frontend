import React from "react";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 600px;
`;

export const Logo = styled.img`
  width: auto;
  height: 240px;
  position: absolute;
`;

export const Text = styled.div`
  position: absolute;
  text-align: center;
  width: 425px;
  top: 400px;
  font-style: normal;
  font-weight: normal;
  font-size: 21.4598px;
  line-height: 28px;
  color: #ffffff;
`;

export const ComingSoon = () => {
  return (
    <>
      <Container>
        <Logo src="Beeper-Logo-v3_@2x.png" />
        <Text>
          A NEW MOBILE MUSIC EXPERIENCE COMING TO A “WHERE EVER YOU ARE” NEAR
          YOU.
        </Text>
      </Container>
    </>
  );
};
