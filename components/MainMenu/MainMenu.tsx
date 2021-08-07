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
import CloseIcon from "@material-ui/icons/Close";
import { MainMenuProps, menuDataItem } from "./types";
import { useMediaQuery } from "react-responsive";
import DesktopMenu from "./DesktopMenu";
import styled from "@emotion/styled";
const SiderMenu = styled(List)`
  width: 100%;
`;
export interface MenuItemProps {
  pl: string;
}
const MenuItem = styled(ListItem)<MenuItemProps>`
  padding-left: ${(props) => props.pl}!important;
`;
const PCHidden = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const MenuHeader = styled.div`
  height: 60px;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0;
  background-color: #fff;
  font-size: 8vw !important;
  border-bottom: 1px solid #000;
`;
const MenuTitle = styled.span``;
const MenuClose = styled(CloseIcon)`
  color: #000;
`;

const MobileHidden = styled.div`
  @media screen and (max-width: 767px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
export const MainMenu = (props: MainMenuProps) => {
  const {
    showMenuHeader,
    menuFooter,
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
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
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
  const getSubMenuOrItems = (menusData: menuDataItem[], parentKeyPath: string, level: number) => {
    const pl = level * 40 + "px";
    return (
      <SiderMenu disablePadding>
        {menusData.map((item, index) => {
          return (
            <Fragment key={parentKeyPath + "/" + item.key}>
              {
                <MenuItem
                  pl={pl}
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
                  {getSubMenuOrItems(item.children, parentKeyPath + "/" + item.key, level + 1)}
                </Collapse>
              )}
            </Fragment>
          );
        })}
      </SiderMenu>
    );
  };

  {
    /*<div className={'layout'}>
      <DesktopMenu onMenuItemClick={onMenuItemClick} pcWrapClassName={classnames(pcWrapClassName)} pcMenuItemClassName={pcMenuItemClassName}  menusData={menusData} />
      </div>*/
  }
  return (
    <>
      <PCHidden>
        <Menu isOpen={open} onOpen={handleOpen} onClose={handleClose} {...others}>
          {showMenuHeader ? (
            <MenuHeader>
              <MenuTitle>MENU</MenuTitle>
              <MenuClose onClick={handleClose} fontSize={"large"} />
            </MenuHeader>
          ) : null}
          {getSubMenuOrItems(menusData, "", 0)}
          {menuFooter && menuFooter()}
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
