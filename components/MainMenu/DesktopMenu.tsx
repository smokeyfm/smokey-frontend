import React, { useState, useCallback, useEffect } from "react";
import { IDesktopMenuProps } from "./types/DesktopMenu";
import { menuDataItem } from "./types";

import { Container, MyMenuItem, DropDown } from "./DesktopMenu.styles";

const DesktopMenu: React.FC<IDesktopMenuProps> = (props: IDesktopMenuProps) => {
  let timer: any;
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
          onMouseEnter={handleMouseEnter.bind(null, item)}
        >
          {item.name}
        </MyMenuItem>
      ))}
      {menusData.map((item, index) => (
        <DropDown
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter.bind(null, item)}
          isActive={currentKey == item.key}
          key={index}
        >
          {item.pcMenuItem}
        </DropDown>
      ))}
    </Container>
  );
};
export default DesktopMenu;
