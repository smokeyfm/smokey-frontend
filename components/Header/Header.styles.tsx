import styled from "@emotion/styled";

export const TopHeader = styled.div`
  padding: 30px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const RightSide = styled.div`
  width: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const LogoDiv = styled.div`
  padding: 15px 30px;
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const HeaderDiv = styled.header`
  margin-bottom: 25px;
  z-index: 1;
`;

export interface LinkDivProps {
  isActive: boolean;
}

export const LinkDiv = styled.a<LinkDivProps>`
  font-size: 14px;
  text-decoration: ${(props) => (props.isActive ? "underline" : "none")};
`;
export const BottomHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px 0px;

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
