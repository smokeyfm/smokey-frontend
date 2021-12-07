import styled from "@emotion/styled";
export const Container = styled.div`
  padding-top: 41px;
  color: #fff;
  padding-bottom: 68px;
  @media (max-width: ${(p) => p.theme.breakpoints.values.xs}px) {
    padding-top: 14px;
  }
`;
export const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Grid = styled.div`
  display: grid;
  padding: 20px 260px;
  justify-content: space-between;
  grid-template-columns: 111px 148px 67px 173px;
  justify-items: center;
  font-family: "Bebas Neue";
  @media (max-width: ${(p) => p.theme.breakpoints.values.xs}px) {
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    justify-content: start;
    grid-template-columns: [a]29.6vw 36.5vw;
    justify-content: space-between;
    row-gap: 11.2vw;
    justify-items: start;
  }
`;
export const IconLinksMo = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 68px;
  display: none;
  @media (max-width: ${(p) => p.theme.breakpoints.values.xs}px) {
    display: flex;
  }
`;
export const MobileIconLink = styled.a``;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ColumnTitle = styled.div`
  font-family: "Bebas Neue";
  font-size: 14px;
  line-height: 17px;
  color: #fff;
  font-weight: 400;
  margin-bottom: 22px;
  white-space: nowrap;
  @media (max-width: ${(p) => p.theme.breakpoints.values.xs}px) {
    margin-bottom: 9px;
    font-size: 20px;
    line-height: 24px;
    color: #eb8b8b;
  }
`;
export const ColumnSubTitle = styled.div`
  font-family: "Bebas Neue";
`;
export const LinkItem = styled.a`
  font-size: 14px;
  line-height: 150%;
  color: #969696;
  font-weight: 400;
  font-family: "Bebas Neue";
`;
export const Description = styled.div`
  color: #969696;
  font-size: 14px;
  line-height: 150%;
  font-weight: 400;
  margin-bottom: 5px;
  font-family: "Bebas Neue";
`;
export const IconLink = styled.a``;
export const IconLinkWrapper = styled.div`
  @media (max-width: ${(p) => p.theme.breakpoints.values.xs}px) {
    display: none;
  }
  @media (max-width: 750px) {
    display: none;
  }
`;
