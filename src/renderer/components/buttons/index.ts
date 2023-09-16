import React from "react";
import { MenuItemProps } from "@mui/material";

export { default as Button, type ButtonProps } from "./Button";
export { default as IconButton, type IconButtonProps } from "./IconButton";
// eslint-disable-next-line import/no-cycle
export { default as IconButtonWithMenu } from "./IconButtonWithMenu";

export type MenuItemType = {
    label: string;
    onClick: () => void;
    menuItemProps?: MenuItemProps;
    icon?: React.ReactNode;
};

export type IconButtonWithMenuProps = {
    icon: React.ReactNode;
    menuList: MenuItemType[];
    size?: "small" | "medium" | "large";
};
