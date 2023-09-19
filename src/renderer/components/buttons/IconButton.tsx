import React from "react";
import {
    IconButton as MuiIconButton,
    type IconButtonProps as MuiIconButtonProps,
    Tooltip,
    TooltipProps,
} from "@mui/material";

export type IconButtonProps = {
    tooltip?: string;
    tooltipProps?: TooltipProps;
} & MuiIconButtonProps;

function IconButton({
    tooltip,
    tooltipProps,
    ...iconButtonProps
}: IconButtonProps) {
    return (
        <Tooltip title={tooltip} {...tooltipProps}>
            <MuiIconButton {...iconButtonProps} />
        </Tooltip>
    );
}

IconButton.defaultProps = {
    tooltip: undefined,
    tooltipProps: {
        arrow: true,
    },
};

export default IconButton;
