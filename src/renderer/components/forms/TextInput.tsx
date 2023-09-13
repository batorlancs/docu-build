import { FieldInputProps, useField } from "formik";
import {
    FormControl,
    Input,
    FormLabel,
    FormHelperText,
    InputProps,
} from "@mui/joy";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ShowConditionally } from "../animations";

type CustomInputUnwantedProps = keyof FieldInputProps<string> &
    "error" &
    "placeholder";

type CustomInputProps = {
    [K in Exclude<keyof InputProps, CustomInputUnwantedProps>]: InputProps[K];
};

type TextInputProps = {
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
    type?: string;
    inputProps?: CustomInputProps;
};

function TextInput({
    label,
    name,
    placeholder,
    inputProps,
    required,
}: TextInputProps) {
    const [field, meta] = useField<string>(name);
    const { error, touched } = meta;

    return (
        <FormControl required={required} error={!!error && touched}>
            <FormLabel required={required}>{label}</FormLabel>
            <Input
                {...field}
                placeholder={placeholder}
                error={!!error && touched}
                {...inputProps}
            />
            <ShowConditionally show={!!error}>
                <FormHelperText>
                    <InformationCircleIcon className="h-6 w-6 mr-2" />
                    {error}
                </FormHelperText>
            </ShowConditionally>
        </FormControl>
    );
}

TextInput.defaultProps = {
    required: false,
    type: "text",
    inputProps: {
        variant: "outlined",
    },
};

export default TextInput;
