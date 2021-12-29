import React, { Fragment, useState, useCallback } from "react";
import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import { slide as BurgerMenu } from "react-burger-menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { menuStyles } from "./menuStyles";

import { MenuToggle, MenuFooter } from "./MainMenu.styles";

import {
  StyledList,
  StyledListItem,
  StyledListItemText,
  StyledListItemIcon
} from "./MobileMenu.styles";

export interface MenuItemProps {
  paddingLeft: string;
}

const MenuItem = styled(StyledListItem, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "paddingLeft"
})<MenuItemProps>`
  padding-left: ${(props) => props.paddingLeft}!important;
`;

export const MobileMenu = ({ showMenuHeader, onMenuItemClick, menusData }: any) => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((value: any) => !value);

  const [keyPath, setKeyPath] = useState("");
  const handleClick = useCallback(
    (kp: any, key: any) => {
      if (onMenuItemClick) {
        onMenuItemClick(kp, key);
      }
      setKeyPath((pre) => {
        if (kp == pre) {
          console.log("closing");
          let str = kp.replace("/" + key, "");
          return str;
        } else {
          console.log("opening");
          return kp;
        }
      });
    },
    [onMenuItemClick]
  );

  const getSubMenuItem = (localMenuData: any[], parentKeyPath: string, level: number) => {
    const paddingLeft = level * 20 + "px";
    const isArray = Array.isArray(localMenuData);
    console.log(isArray, localMenuData);
    const menuItems = isArray
      ? localMenuData
      : menusData?.menu_location_listing[0].menu_item_listing;
    // console.log('local menu: ', localMenuData);
    return (
      <StyledList disablePadding>
        {menuItems.map((item: any, index: any) => {
          const subItems = item.childrens;
          const slug = item.name.toLowerCase();
          const pathSlug = parentKeyPath + "/" + slug;
          // console.log(subItems, pathSlug, keyPath.indexOf(pathSlug) != -1);

          return (
            <Fragment key={pathSlug}>
              {
                <MenuItem
                  paddingLeft={paddingLeft}
                  onClick={handleClick.bind(null, pathSlug, slug)}
                  button
                >
                  {/* <StyledListItemIcon>{item.icon ? item.icon() : null}</StyledListItemIcon> */}
                  {/* <StyledListItemText primary={item.name.replace("/", "_")} /> */}
                  <StyledListItemText primary={item.name} />
                  {item &&
                    subItems &&
                    subItems.length != 0 &&
                    (keyPath.indexOf(pathSlug) != -1 ? <ExpandLess /> : <ExpandMore />)}
                </MenuItem>
              }
              {item && subItems && subItems.length != 0 && (
                <Collapse timeout="auto" unmountOnExit in={keyPath.indexOf(pathSlug) != -1}>
                  {level < 2 ? getSubMenuItem(subItems, pathSlug, level + 1) : null}
                  {/* <h1>hey</h1> */}
                  {subItems.map(({ item, i }: any) => {
                    return <>{item}</>;
                  })}
                </Collapse>
              )}
            </Fragment>
          );
        })}
      </StyledList>
    );
  };

  return (
    <BurgerMenu
      width={"66%"}
      isOpen={open}
      onOpen={toggleMenu}
      onClose={toggleMenu}
      styles={menuStyles}
      // {...others}
    >
      {/* <BurgerMenu width={220} isOpen={open} onOpen={toggleMenu} onClose={toggleMenu} {...others}> */}
      {showMenuHeader ? (
        <>
          <div onClick={toggleMenu}>
            <i className="btb bt-close" />
          </div>
        </>
      ) : null}
      {/* {getSubMenuItem(menuItemsData && menuItemsData?.response_data.menu_location_listing[0], "", 0)} */}
      {getSubMenuItem(menusData, "", 0)}
      <MenuItem paddingLeft={"10px"} onClick={() => console.log("login")} button>
        Login
      </MenuItem>
      <MenuFooter>
        <div>Privacy Policy - Terms &amp; Conditions - RETURN POLICY</div>
        <div>All Materials Copyright © 2021 POL Clothing</div>
      </MenuFooter>
    </BurgerMenu>
  );
};
