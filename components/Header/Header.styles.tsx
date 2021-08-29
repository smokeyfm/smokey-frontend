import styled from "@emotion/styled";

export const TopHeader = styled.div`
  padding: 10px 0 12px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const RightSide = styled.div`
  width: 33%;
  display: flex;
  position: absolute;
  top: 0;
  right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;
export const LogoDiv = styled.div`
  width: 180px;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  cursor: pointer;
`;
export const HeaderDiv = styled.header`
  z-index: 9;
`;

export interface LinkDivProps {
  isActive: boolean;
}

export const LinkDiv = styled.a<LinkDivProps>`
  font-size: 14px;
  text-decoration: none;
`;
export const BottomHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px;
  & > :first-child {
    padding-left: 0px;
  }
  & > :last-child {
    padding-right: 0px;
  }
`;
export const Category = styled.a`
  padding: 15px;
`;
