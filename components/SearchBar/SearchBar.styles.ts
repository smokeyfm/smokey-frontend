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
  width: 100%;
`;

export const StyledInputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const StyledInput = styled.input`
  margin: 10px 5px;
  width: 100%;

  input {
    padding: 0 40px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;
export interface SearchButtonProps{
  theme?:{
    colors:{
      white:{primary:string;};
      blue:{
        primary:string;
        medium:string;
      };
    }
  }
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
export interface BrowseButtonProps{
  small?:boolean;
}
export const BrowseButton = styled.button<BrowseButtonProps>`
  margin: 10px 10px 10px 20px;
`;

const defaultPrefixStyles = css`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  height: 100%;
  width: 44px;
  z-index: 1;
`;

export const StyledInputPrefix = styled.div`
  ${defaultPrefixStyles};
  left: 5px;
  padding-right: 10px;
  justify-content: flex-end;
`;
export interface StyledInputPostfixProps{
  theme?:{
    colors:{
      blue:{
        primary:string;
      };
      gray:{
        medium: string;
      }
    }
  }
}
export const StyledInputPostfix = styled.div<StyledInputPostfixProps>`
  ${defaultPrefixStyles};
  right: 45px;
  padding-left: 10px;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.blue.primary};

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
