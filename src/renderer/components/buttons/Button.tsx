import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/joy";
import { Tooltip, type TooltipProps } from "@mui/material";
import { twMerge } from "tailwind-merge";

export type ButtonProps = MuiButtonProps & {
    tooltip?: string;
    tooltipProps?: Omit<TooltipProps, "children" | "title">;
};

function Button({ tooltipProps, tooltip, className, ...props }: ButtonProps) {
    const { arrow = true, ...restTooltipProps } = tooltipProps ?? {};

    return (
        <Tooltip title={tooltip} arrow={arrow} {...restTooltipProps}>
            <MuiButton
                className={twMerge("whitespace-nowrap", className)}
                {...props}
            />
        </Tooltip>
    );
}

Button.defaultProps = {
    tooltip: undefined,
    tooltipProps: {
        arrow: true,
    },
} as Partial<ButtonProps>;

export default Button;
