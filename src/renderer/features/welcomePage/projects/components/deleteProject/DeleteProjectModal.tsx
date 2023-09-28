import { Modal } from "renderer/components/modals";
import { ProjectData } from "main/store";
import { Typography } from "@mui/joy";
import { Formik, Form } from "formik";
import { FormButton, TextInput } from "renderer/components/forms";
import * as yup from "yup";

type DeleteProjectModalProps = {
    data: ProjectData;
    show: boolean;
    toggleShow: () => void;
    onConfirm: () => void;
};

const FORM_INITIALS = {
    confirm: "",
};

function DeleteProjectModal({
    data,
    show,
    toggleShow,
    onConfirm,
}: DeleteProjectModalProps) {
    const validationString = `delete/${data.name}`;

    return (
        <Modal show={show} toggleShow={toggleShow} title="Delete project">
            <Typography marginBottom={3}>
                Are you sure you want to delete this project?
            </Typography>
            <Typography color="warning">
                Please enter{" "}
                <Typography color="danger" fontWeight="medium" variant="soft">
                    delete/{data.name}
                </Typography>{" "}
                to confirm.
            </Typography>
            <Formik
                initialValues={FORM_INITIALS}
                validationSchema={yup.object({
                    confirm: yup
                        .string()
                        .required("Confirmation is required.")
                        .test(
                            "confirm",
                            "Confirmation is invalid.",
                            (value) => value === validationString
                        ),
                })}
                onSubmit={() => {
                    toggleShow();
                    onConfirm();
                }}
            >
                <Form>
                    <TextInput
                        name="confirm"
                        label=""
                        placeholder="...type here"
                    />
                    <FormButton
                        sx={{
                            marginTop: 4,
                        }}
                        color="danger"
                    >
                        Delete Project
                    </FormButton>
                </Form>
            </Formik>
        </Modal>
    );
}

export default DeleteProjectModal;
