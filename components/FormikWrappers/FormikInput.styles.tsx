import styled from "@emotion/styled";
import { Checkbox } from "@material-ui/core";

export const Error = styled.div`
  color: ${(props) => props.theme.colors.red.primary};
  text-align: left;
`;

export const HiddenInput = styled.div`
  display: none;
`;

export const SuggestionWrapper = styled.div`
  background: ${(props) => props.theme.colors.white.primary};
  position: relative;
  margin-top: 15px;
  align-items: flex-start;
  justify-content: center;
  flex-flow: column nowrap;
  min-width: 250px;
  max-width: 500px;
  max-height: 200px;
  overflow: scroll;
  z-index: 1;
  display: flex;
  box-shadow: 1px 3px 30px rgba(0, 0, 0, 0.23);
  margin-top: 15px;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.colors.gray.light};
  transition: all 0.3s ease-in-out;

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding: 20px 0 60px 0;
    justify-content: top;
  }
`;

export const SuggestionLoader = styled.div`
  margin: 0 auto;
`;

export const SuggestionItem = styled.div`
  align-self: flex-start;
  padding: 5px 10px;
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.colors.gray.medium};
  &.active {
    cursor: pointer;
    color: ${(props) => props.theme.colors.brand.primary};
    background: ${(props) => props.theme.colors.gray.background};
  }
`;

export const TermsCheckbox = styled(Checkbox)`
  flex-basis: 5%;

  > .checkbox-label {
    color: ${(props) =>
      props.accepted ? props.theme.colors.brand.dark : props.theme.colors.red.primary};
  }

  .checkbox-style {
    border-color: ${(props) =>
      props.accepted ? props.theme.colors.brand.dark : props.theme.colors.red.primary};
    stroke: ${(props) =>
      props.accepted ? props.theme.colors.brand.dark : props.theme.colors.red.primary};
  }
`;

export const Wrapper = styled.div`
  padding: 15px;
`;
