import { menuDataItem } from "./index";

export interface IDesktopMenuProps {
  // menusData: menuDataItem[];
  menusData: any;
  pcMenuItemClassName?: string;
  pcWrapClassName?: string;
  onMenuItemClick?: (keyPath: string, key: string) => void;
}
