import { Button, type ButtonProps } from "../buttons";

type FormButtonProps = Omit<ButtonProps, "type">;

function FormButton({ ...buttonProps }: FormButtonProps) {
    return <Button type="submit" {...buttonProps} />;
}

export default FormButton;
