import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: auto;
  min-height: 100vh;
`;

export const Logo = styled.img`
  width: auto;
  height: 240px;

  @media screen and (max-width: ${(p) => p.theme.breakpoints.values.sm}px) {
    width: 90%;
    height: auto;
  }
`;

export const Text = styled.div`
  text-align: center;
  width: 425px;
  top: 400px;
  font-style: normal;
  font-weight: normal;
  font-size: 21.4598px;
  line-height: 28px;
  color: #ffffff;
`;
