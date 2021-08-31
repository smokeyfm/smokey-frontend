import styled from "styled-components";
import { Modal } from "@material-ui/core";

export const QuestionWrapper = styled.div`
  color: ${(props) => props.theme.carvana.blue.primary};
  ${"" /* width: 100%; */}
  margin: 15px 0 15px 0;
`;

export const InputGroupWrapper = styled.div`
  ${
    "" /* background: ${props => props.theme.carvana.white.primary};
  color: ${props => props.theme.carvana.blue.primary};
  box-shadow: 1px 3px 8px rgba(0,0,0,0.123);
  width: 100%;
  margin: 15px 15px 0 0px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px; */
  }
  margin: -50px 15px 15px 15px;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin: 0 auto;
    padding: 30px 0px 0px 0px;
  }
  & [data-qa="title"] {
    color: ${(props) => props.theme.carvana.blue.dark};
    font-size: 1.6rem;
  }
  & .carousel .thumbs-wrapper {
    display: none;
  }
  & .carousel .slide {
    background: transparent;
    padding-bottom: 20px;
  }
  & .carousel .control-dots {
    padding: 0;
  }
  & .carousel .control-dots .dot {
    width: 5px;
    height: 5px;
    background: ${(props) => props.theme.carvana.gray.dark};
    box-shadow: none;
    &:focus {
      outline: none;
    }
  }
  & .carousel .control-dots .dot.selected {
    background: ${(props) => props.theme.carvana.white.primary};
    box-shadow: 0 0 0 7px ${(props) => props.theme.carvana.blue.primary};
  }
`;

export const InputWrapper = styled.div`
  text-align: left;
  margin: 10px 25px;

  & .jHdjnz {
    width: auto;
  }
`;

export const Title = styled.h1`
  margin: 5px 15px;
  color: ${(props) => props.theme.carvana.blue.dark};
`;

export const Subtitle = styled.h3`
  margin: 5px 15px;
  color: ${(props) => props.theme.carvana.blue.dark};
`;

export const Description = styled.p`
  margin: 5px 15px 25px 15px;
  color: ${(props) => props.theme.carvana.gray.medium};
`;

export const LinkOut = styled.a`
  & button {
    margin: 0 auto;
  }
`;

export const TermsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: start;
  padding: 0 25px;
  overflow: hidden;
`;

export const Term = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
`;

export const TermsStatement = styled.p`
  font-size: 0.7rem;
  text-align: left;
  flex-basis: 100%;
  color: ${(props) =>
    props.accepted ? props.theme.carvana.blue.dark : props.theme.carvana.red.primary};
  height: 50px;
  overflow-y: scroll;
  margin: 0;

  & button {
    cursor: pointer;
    display: contents;
    font-weight: 700;
    text-decoration: underline;
    color: ${(props) =>
      props.accepted ? props.theme.carvana.blue.dark : props.theme.carvana.red.primary};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    flex-basis: 50%;
  }
`;

export const StyledModalContent = styled(ModalContent)`
  ${"" /* Modal Header Container */}
  & .gkBGAw {
    z-index: 1052;
    & h5 {
      margin: 0 10%;
    }
  }
`;

// export const StyledModalHeader = styled(ModalHeader)`
//   z-index: 1052;
//   &
// `;
