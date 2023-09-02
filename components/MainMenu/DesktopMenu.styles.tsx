import styled from "@emotion/styled";

export interface MyMenuItemProps {
  isActive: boolean;
}

export interface DropDownProps {
  isActive: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  padding-bottom: 13px;
  justify-content: center;
  gap: 40px;
`;

export const MyMenuItem = styled.div<MyMenuItemProps>`
  font-family: "Bebas Neue";
  font-size: 14px;
  line-height: 150%;
  color: ${(p) => p.theme.colors.black.primary};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  text-align: center;
  &:after {
    transition: transform 1s linear;
    width: 120%;
    height: 1px;
    background-color: ${(p) => p.theme.colors.black.primary};
    content: "";
    position: absolute;
    bottom: 0;
    display: ${(props) => (props.isActive ? "block" : "none")};
    transfrom: ${(props) => (props.isActive ? "translateX(0)" : "translateX(-100%)")};
  }
`;

export const DropDown = styled.div<DropDownProps>`
  position: absolute;
  background-color: #fff;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 10000;
  transition: all 1s linear;
  display: ${(props) => (props.isActive ? "block" : "none")};
  transform: ${(props) => (props.isActive ? "translateY(0)" : "translateY(-100%)")};
  box-shadow: 0 6px 12px rgb(0 0 0 / 5%);
`;
