import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const StyledSearch = styled.div`
  position: relative;

  #search {
    height: 42px;
    font-weight: normal;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

interface StyledInputContainerType {
  isExpanded: boolean;
  isWidthSet: boolean;
}

// Get Search input expanded, fitting nice with suggestion dropdown
export const StyledInputContainer = styled.div<StyledInputContainerType>`
  position: relative;
  display: inline-block;
  width: ${(p) => (p.isExpanded ? "195px" : "0%")};
  transition: 0.33s all ease-in-out;

  & > input {
    transition: 0.33s all ease-in-out;
    background: transparent;
    padding-left: ${(p) => (p.isExpanded ? "34px" : 0)};
    margin-right: 10px;
    border-bottom: ${(p) => (p.isExpanded ? "1px solid black" : 0)};
    width: ${(p) => (p.isWidthSet ? "140px" : "100%")};
    ${(p) => (p.isExpanded ? "padding: 0px 26px 0 30px;" : null)}
  }
`;

export const StyledInput = styled.input`
  font-family: ${(p) => p.theme.typography.titleSM.fontFamily};
  border: 0;
  outline: none;
`;

const defaultPrefixStyles = css`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  height: 100%;
  width: 44px;
  z-index: 3;
  cursor: pointer;
`;

export const StyledInputPrefix = styled.div`
  ${defaultPrefixStyles};
  left: 0px;
  justify-content: flex-start;

  & > i {
    color: ${(props) => props.theme.colors.black.primary};
  }
`;
export interface StyledInputPostfixProps {
  theme?: {
    colors: {
      blue: {
        primary: string;
      };
      gray: {
        medium: string;
      };
    };
  };
}
export const StyledInputPostfix = styled.div<StyledInputPostfixProps>`
  ${defaultPrefixStyles};
  right: 5px;
  justify-content: flex-end;
  color: ${(props) => props.theme.colors.blue.primary};

  & > i {
    color: ${(props) => props.theme.colors.black.primary};
  }

  &:hover {
    color: ${(props) => props.theme.colors.gray.medium};
    cursor: pointer;
  }
`;

export const StyledIcon = styled.svg`
  width: 1rem;
  height: 1rem;

  &.close-icon {
    width: 13px;
    height: 13px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

export interface SearchButtonProps {
  theme?: {
    colors: {
      white: { primary: string };
      blue: {
        primary: string;
        medium: string;
      };
    };
  };
}

export const SearchButton = styled.button<SearchButtonProps>`
  margin: 16px 10px 10px -55px;
  float: right;
  position: absolute;
  border: 0;
  border-radius: 3px;
  padding: 3px 18px;
  color: ${(props) => props.theme.colors.white.primary};
  background-color: ${(props) => props.theme.colors.blue.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.blue.medium};
  }
`;
export interface BrowseButtonProps {
  small?: boolean;
}
export const BrowseButton = styled.button<BrowseButtonProps>`
  margin: 10px 10px 10px 20px;
`;
