import React from "react";
import { Menu, MenuItem } from "@mui/material";
// eslint-disable-next-line import/no-cycle
import {
    IconButton,
    IconButtonWithMenuProps,
} from "renderer/components/buttons";

function IconButtonWithMenu({ icon, menuList, size }: IconButtonWithMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                size={size}
                onClick={handleClick}
            >
                <div className="h-6 w-6">{icon}</div>
            </IconButton>
            <Menu
                style={{
                    marginTop: 6,
                }}
                sx={{
                    "& .MuiMenu-paper": {
                        width: "20ch",
                        borderRadius: "8px",
                        backgroundColor: "rgb(40, 40, 40)",
                    },
                }}
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {menuList.map((item) => (
                    <MenuItem
                        key={item.label}
                        onClick={() => {
                            item.onClick();
                            handleClose();
                        }}
                        {...item.menuItemProps}
                    >
                        {item.icon && (
                            <div className="mr-2 h-6 w-6">{item.icon}</div>
                        )}
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

IconButtonWithMenu.defaultProps = {
    size: "md",
};

export default IconButtonWithMenu;
