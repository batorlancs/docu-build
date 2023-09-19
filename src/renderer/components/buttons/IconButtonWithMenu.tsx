import React from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/joy";
import {
    IconButton,
    IconButtonWithMenuProps,
} from "renderer/components/buttons";

function IconButtonWithMenu({
    icon,
    menuList,
    size,
    buttonSx,
}: IconButtonWithMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const muiTheme = useTheme().colorSchemes.dark.palette.neutral[800];
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
                sx={buttonSx}
            >
                <div className="h-6 w-6">{icon}</div>
            </IconButton>
            <Menu
                style={{
                    marginTop: 6,
                }}
                sx={{
                    "& .MuiMenu-paper": {
                        borderRadius: "8px",
                        backgroundColor: muiTheme,
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
                            <div className="mr-2 h-5 w-5 flex-shrink-0">
                                {item.icon}
                            </div>
                        )}
                        <Typography noWrap variant="inherit" marginRight={1}>
                            {item.label}
                        </Typography>
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
