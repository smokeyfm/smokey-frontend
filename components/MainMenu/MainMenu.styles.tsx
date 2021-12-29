import styled from "@emotion/styled";

export const HiddenOnDesktop = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const HiddenOnMobile = styled.div`
  position: relative;
  z-index: 3;
  box-shadow: 0 6px 12px rgb(0 0 0 / 5%);
  @media screen and (max-width: 767px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

export const MenuToggle = styled.div`
  position: fixed;
  width: 36px;
  height: 30px;
  left: 1.06vw;
  top: 3.73vw;
`;

export const MenuFooter = styled.div`
  /* position: fixed; */
  bottom: 0;
`;
