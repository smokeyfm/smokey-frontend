import React, { useState, useCallback, useEffect } from "react";
import { IDesktopMenuProps } from "./types/DesktopMenu";
import { menuDataItem } from "./types";
import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  padding-bottom: 13px;
`;
export interface MyMenuItemProps {
  isActive: boolean;
}
const MyMenuItem = styled.div<MyMenuItemProps>`
  margin-right: 82px;
  font-family: "Bebas Neue";
  font-size: 14px;
  line-height: 150%;
  color: #000;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:after {
    transition: transform 1s linear;
    width: 57px;
    height: 1px;
    background-color: #000;
    content: "";
    position: absolute;
    bottom: 0;
    display: ${(props) => (props.isActive ? "block" : "none")};
    transfrom: ${(props) => (props.isActive ? "translateX(0)" : "translateX(-100%)")};
  }
  &:first-child {
    margin-left: 197px;
  }
`;
export interface DropDownProps {
  isActive: boolean;
}
let timer: any;
const DropDown = styled.div<DropDownProps>`
  position: absolute;
  background-color: #fff;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 10000;
  transition: transform 1s linear;
  display: ${(props) => (props.isActive ? "block" : "none")};
  transform: ${(props) => (props.isActive ? "translateY(0)" : "translateY(-100%)")};
`;

const DesktopMenu: React.FC<IDesktopMenuProps> = (props: IDesktopMenuProps) => {
  const { pcWrapClassName, menusData, pcMenuItemClassName, onMenuItemClick } = props;
  const [currentKey, setCurrentKey] = useState();
  const handleMouseEnter = useCallback((item) => {
    if (timer) {
      clearTimeout(timer);
    }
    setCurrentKey(item.key);
  }, []);
  const handleMouseLeave = useCallback(() => {
    timer = setTimeout(() => setCurrentKey(undefined), 300);
  }, []);
  return (
    <Container className={pcWrapClassName}>
      {menusData.map((item, index) => (
        <MyMenuItem
          onMouseLeave={handleMouseLeave}
          isActive={currentKey == item.key}
          key={index}
          onMouseEnter={handleMouseEnter.bind(null, item)}>
          {item.name}
        </MyMenuItem>
      ))}
      {menusData.map((item, index) => (
        <DropDown
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter.bind(null, item)}
          isActive={currentKey == item.key}
          key={index}>
          {item.pcMenuItem}
        </DropDown>
      ))}
    </Container>
  );
};
export default DesktopMenu;
