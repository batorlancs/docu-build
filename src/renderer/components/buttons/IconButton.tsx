import React from "react";
import {
    IconButton as MuiIconButton,
    IconButtonProps as MuiIconButtonProps,
    Tooltip,
    TooltipProps,
} from "@mui/joy";

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
        variant: "solid",
        arrow: true,
    },
};

export default IconButton;
