import { useFormikContext } from "formik";
import { Button, type ButtonProps } from "../buttons";

type FormButtonProps = Omit<ButtonProps, "disabled" | "type">;

function FormButton({ ...buttonProps }: FormButtonProps) {
    const { isValid } = useFormikContext();
    return <Button type="submit" disabled={!isValid} {...buttonProps} />;
}

export default FormButton;
