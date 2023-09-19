import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/joy";
import { twMerge } from "tailwind-merge";

export type ButtonProps = MuiButtonProps;

function Button({ className, ...props }: ButtonProps) {
    return (
        <MuiButton
            className={twMerge("whitespace-nowrap", className)}
            {...props}
        />
    );
}

export default Button;
