import styled from "@emotion/styled/";

//Emotion styling
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  height: 175px;
`;

export const NotifyText = styled.div`
  text-align: center;
  width: 100%;
  font-style: normal;
  font-weight: 200;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
  & form {
    width: 300px;
  }
`;

export const EmailInput = styled.input`
  text-align: left;
  width: 300px;
  height: 36.15px;
  background: #eccfed;
  border: 1.89432px solid rgba(255, 0, 138, 0.15);
  box-sizing: border-box;
  box-shadow: -6.76748px -6.76748px 27.0772px rgb(144 0 147 / 70%),
    6.76871px 6.76748px 27.0749px #000000, inset 2.70748px 2.70748px 20.3061px #1a0300;
  border-radius: 36.1511px;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  outline: none;
  padding: 8px 15px;
  &::placeholder {
    color: ${(props) => props.theme.colors.blue.primary};
  }
  &:focus::placeholder {
    color: ${(props) => props.theme.colors.pink.primary};
  }
`;

export const Button = styled.button`
  color: #ce8dd0;
  text-align: center;
  width: 201px;
  height: 36.15px;
  margin-left: -100px;
  background: #430098;
  border: 1.89432px solid rgba(255, 0, 138, 0.15);
  box-sizing: border-box;
  box-shadow: -6.76748px -6.76748px 27.0772px rgb(144 0 147 / 70%),
    6.76871px 6.76748px 27.0749px #000000, inset 2.70748px 2.70748px 20.3061px #1a0300;
  border-radius: 36.1511px;
  position: relative;
  top: 0;
  right: 0;
  width: 75px;
  cursor: pointer;
  float: right;
`;

export const MailTo = styled.a`
  text-decoration: none;
  text-align: center;
  line-height: 19px;
  font-style: normal;
  font-weight: 200;
  font-size: 15px;
  color: #ffffff;
  padding-top: 25px;
  bottom: 0;
`;
