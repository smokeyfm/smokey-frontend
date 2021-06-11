import React, { useState, useCallback } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IDesktopMenuProps } from "./types/DesktopMenu";
import { makeStyles, createStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import classnames from "classnames";
import { menuDataItem } from "./types";
const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingLeft: "100px",
      height: "80px",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap"
    },
    topMenuItem: {
      marginRight: "50px",
      lineHeight: "80px"
    }
  })
);
const DesktopMenu: React.FC<IDesktopMenuProps> = (props: IDesktopMenuProps) => {
  const { pcWrapClassName, menusData, pcMenuItemClassName, onMenuItemClick } = props;
  const classes = useStyles();
  const [keyPathMap, setKeyPathMap] = useState({});
  const handleClick = useCallback((keyPath, event) => {
    setKeyPathMap((pre) => {
      let ret = { [keyPath]: event.target };
      return ret;
    });
  }, []);
  const handleClose = useCallback((keyPath) => {
    setKeyPathMap((pre) => {
      return { ...pre, [keyPath]: null };
    });
  }, []);
  const handleClickMenuItem = useCallback((keyPath: string, key: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(keyPath, key);
    }
    setKeyPathMap({});
  }, []);
  const getSubMenuOrItems = (menusData: menuDataItem[], parentKeyPath: string, level: number) => {
    return menusData.map((item, index) => {
      return (
        <div
          className={classnames(classes.topMenuItem, pcMenuItemClassName)}
          key={parentKeyPath + "/" + item.key}>
          <div
            style={{ textAlign: "center", width: "100%" }}
            onClick={handleClick.bind(null, parentKeyPath + "/" + item.key)}>
            {item.pcIcon && item.pcIcon()}
            {item.name}
          </div>

          {item && item.children && (
            <Menu
              getContentAnchorEl={null}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              onClose={handleClose.bind(null, `${parentKeyPath}/${item.key}`)}
              keepMounted
              id={`${parentKeyPath}/${item.key}`}
              anchorEl={keyPathMap[`${parentKeyPath}/${item.key}` as keyof typeof keyPathMap]}
              open={Boolean(keyPathMap[`${parentKeyPath}/${item.key}` as keyof typeof keyPathMap])}>
              {item.children.map((v, i) => {
                return (
                  <MenuItem
                    onClick={handleClickMenuItem.bind(
                      null,
                      `${parentKeyPath}/${item.key}/${v.key}`,
                      v.key
                    )}
                    key={parentKeyPath + "/" + item.key + "/" + v.key}>
                    {v.pcIcon && v.pcIcon()}
                    {v.name}
                  </MenuItem>
                );
              })}{" "}
            </Menu>
          )}
        </div>
      );
    });
  };
  return (
    <div className={classnames(classes.container, pcWrapClassName)}>
      {getSubMenuOrItems(menusData, "", 0)}
    </div>
  );
};
export default DesktopMenu;
