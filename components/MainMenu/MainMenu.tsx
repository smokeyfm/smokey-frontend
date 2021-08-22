import React, { Fragment, useCallback, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import classnames from "classnames";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { MainMenuProps, menuDataItem } from "./types";
import DesktopMenu from "./DesktopMenu";
import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
const SiderMenu = styled(List)`
  width: 100%;
`;
export interface MenuItemProps {
  paddingLeft: string;
}
const MenuItem = styled(ListItem, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "paddingLeft"
})<MenuItemProps>`
  padding-left: ${(props) => props.paddingLeft}!important;
`;
const PCHidden = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const MobileHidden = styled.div`
  @media screen and (max-width: 767px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
const MenuFooter = styled.div`
  position: fixed;
  bottom: 0;
`;
export const MainMenu = (props: MainMenuProps) => {
  const {
    showMenuHeader,
    pcWrapClassName,
    pcMenuItemClassName,
    onMenuItemClick,
    animationType,
    children,
    menusData,
    ...others
  } = props;
  const Menu = BurgerMenu[animationType as keyof typeof BurgerMenu];
  const [keyPath, setKeyPath] = useState("");
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((value) => !value);
  const handleClick = useCallback((kp, key) => {
    if (onMenuItemClick) {
      onMenuItemClick(kp, key);
    }
    setKeyPath((pre) => {
      if (kp == pre) {
        let str = kp.replace("/" + key, "");
        return str;
      } else {
        return kp;
      }
    });
  }, []);
  const getSubMenuItem = (menusData: menuDataItem[], parentKeyPath: string, level: number) => {
    const paddingLeft = level * 40 + "px";
    return (
      <SiderMenu disablePadding>
        {menusData.map((item, index) => {
          return (
            <Fragment key={parentKeyPath + "/" + item.key}>
              {
                <MenuItem
                  paddingLeft={paddingLeft}
                  onClick={handleClick.bind(null, parentKeyPath + "/" + item.key, item.key)}
                  button>
                  <ListItemIcon>{item.icon ? item.icon() : null}</ListItemIcon>
                  <ListItemText primary={item.name} />
                  {item &&
                    item.children &&
                    item.children.length != 0 &&
                    (keyPath.indexOf(parentKeyPath + "/" + item.key) != -1 ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </MenuItem>
              }
              {item && item.children && item.children.length != 0 && (
                <Collapse
                  timeout="auto"
                  unmountOnExit
                  in={keyPath.indexOf(parentKeyPath + "/" + item.key) != -1}>
                  {getSubMenuItem(item.children, parentKeyPath + "/" + item.key, level + 1)}
                </Collapse>
              )}
            </Fragment>
          );
        })}
      </SiderMenu>
    );
  };
  return (
    <>
      <PCHidden>
        <Menu isOpen={open} onOpen={toggleMenu} onClose={toggleMenu} {...others}>
          {showMenuHeader ? (
            <>
              <div>MENU</div>
              <div onClick={toggleMenu}>X</div>
            </>
          ) : null}
          {getSubMenuItem(menusData, "", 0)}
          <MenuFooter>
            <div>Privacy Policy - Terms & Conditions - RETURN POLICY</div>
            <div>All Materials Copyright © 2021 POL Clothing</div>
          </MenuFooter>
        </Menu>
      </PCHidden>
      <MobileHidden>
        <DesktopMenu
          onMenuItemClick={onMenuItemClick}
          pcWrapClassName={classnames(pcWrapClassName)}
          pcMenuItemClassName={pcMenuItemClassName}
          menusData={menusData}
        />
      </MobileHidden>
    </>
  );
};
