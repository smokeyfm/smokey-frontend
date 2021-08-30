import Button from "@carvana/forms/Button";
import styled from "styled-components";

export const MainWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  padding: 0 0 80px 0;
`;

export const InitialTitle = styled.div`
  box-sizing: border-box;
  color: ${(props) => props.theme.carvana.white.primary};
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  padding: 40px 0 15px;
  position: absolute;
  margin-top: -290px;
`;

export const Title = styled.div`
  box-sizing: border-box;
  color: ${(props) => props.theme.carvana.white.primary};
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  padding: 40px 0 15px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 0 10%;

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    flex-flow: column nowrap;
    margin: 0 5%;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.values.lg}px) {
  }
`;

export const LeftHalf = styled.div`
  display: ${(props) => props.show};
  flex-direction: column;
  flex-basis: 100%;
  flex: 0 0 48%;
  ${"" /* flex: 1; */}
  ${"" /* flex-grow: 1; */}
  ${"" /* flex-basis: 50%; */}
  background: ${(props) => props.theme.carvana.white.primary};
  color: ${(props) => props.theme.carvana.blue.primary};
  box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.123);
  ${"" /* width: 100%; */}
  ${"" /* margin: 15px; */}
  margin: 15px 15px 0 0;
  border-radius: 8px;
  padding: 15px 15px 60px 15px;
  text-align: center;
  & [data-qa="title"] {
    color: ${(props) => props.theme.carvana.blue.dark};
    font-size: 1.6rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin: 15px 0 0 0;
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.values.lg}px) {
    ${"" /* margin: 15px; */}
    margin: 15px 15px 0 0;
  }
`;

export const RightHalf = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  width: ${(props) => (props.isLargeDevice ? "48%" : "100%")};
  max-width: ${(props) => (props.isLargeDevice ? "48%" : "100%")};
  ${"" /* flex: 1; */}
  ${"" /* flex-grow: 1; */}
  ${"" /* flex-basis: 50%; */}
  & form {
    background: ${(props) => props.theme.carvana.white.primary};
    color: ${(props) => props.theme.carvana.blue.primary};
    border-radius: 8px;
    box-shadow: 1px 8px 8px rgba(0, 0, 0, 0.123);
    ${"" /* width: 100%; */}
    & [data-qa='title'] {
      color: ${(props) => props.theme.carvana.blue.dark};
      font-size: 1.6rem;
    }
  }
`;

export const WizardForm = styled.div`
  padding-top: 0;
  ${"" /* margin-top: ${props => props.canGoBack ? '120px' : '225px'}; */}
  background: ${(props) => props.theme.carvana.white.primary};
  color: ${(props) => props.theme.carvana.blue.primary};
  border-radius: 8px;
  box-shadow: 1px 8px 8px rgba(0, 0, 0, 0.123);
  width: 100%;
  & [data-qa="title"] {
    color: ${(props) => props.theme.carvana.blue.dark};
    font-size: 1.6rem;
  }

  @media (max-width: ${(props) =>
      props.theme.breakpoints.values.sm}px) and (orientation: portrait) {
    padding-top: 0;
    margin-top: ${(props) => (props.canGoBack ? "120px" : "225px")};
  }

  /* iPad Mini 4 --------------- */
  @media only screen and (min-device-width: ${(props) =>
      props.theme.breakpoints.values.sm}px) and (max-device-width: ${(props) =>
      props.theme.breakpoints.values
        .md}px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
    margin-top: ${(props) => (props.canGoBack ? "120px" : "165px")};
    padding-top: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) and (max-width: ${(props) =>
      props.theme.breakpoints.values.md}px) {
    margin-top: ${(props) => (props.canGoBack ? "120px" : "165px")};
    padding-top: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
    margin-top: ${(props) => (props.canGoBack ? "120px" : "165px")};
    padding-top: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.values.lg}px) {
    margin-top: 165px;
    padding-top: 0;
  }
`;

export const WizardActions = styled.div`
  margin: 0 10px 0 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 0 15px 5px 15px;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  & .BtcsS {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin: 0 25px 0 25px;
  }
`;

export const PreviousButton = styled(Button)`
  flex-basis: 30%;
  flex-grow: 1;
  margin-right: 0.5rem;
`;

export const NextButton = styled(Button)`
  margin-left: 0.5rem;
  flex-basis: 70%;
  flex-grow: 2;
`;

export const SkipAction = styled.div`
  margin: 7px 0 15px 0;
  padding: 0 15px 15px 15px;
  display: flex;
  justify-content: center;
  & button {
    width: 100%;
    color: ${(props) => props.theme.carvana.blue.medium};
    text-transform: capitalize;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
  }
`;

export const LoginAction = styled.div`
  margin: 7px 0 15px 0;
  padding: 0 15px 15px 15px;
  display: flex;
  justify-content: center;
  & button a {
    width: 100%;
    color: ${(props) => props.theme.carvana.blue.medium};
    text-transform: capitalize;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
  }
`;

export const Disclaimer = styled.div`
  font-size: 0.7rem;
  text-align: center;
  padding: 15px 20px;
  color: ${(props) => props.theme.carvana.gray.medium};
`;

export const CongratsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px 15px;
  margin-top: 15px;
`;
