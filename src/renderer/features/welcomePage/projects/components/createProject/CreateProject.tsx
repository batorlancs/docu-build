import React, { useRef } from "react";
import { ModalWithButton } from "renderer/components/modals";
import { Formik, Form, FormikProps } from "formik";
import { FormButton, TextInput } from "renderer/components/forms";
import * as yup from "yup";
import LoadingScreen from "./LoadingScreen";

// const startServer = (name: string) => {
//     console.log("STARTING SERVER", name);
//     window.electron.ipcRenderer
//         .startServer(name)
//         .then(() => {
//             console.log("STARTED SERVER");
//             return null;
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

const FORM_INITIALS = {
    projectName: "",
};

const VALIDATION_SCHEMA = yup.object({
    projectName: yup
        .string()
        .min(3, "Project name must be at least 3 characters long.")
        .required("Project name is required.")
        .matches(
            /^[a-zA-Z0-9_]*$/,
            "Project name must not contain special characters."
        )
        .matches(
            /^[a-zA-Z_][a-zA-Z0-9_]*$/,
            "Project name must not start with a number."
        )
        .test("isUnique", "Project name already exists.", async (value) => {
            const projectNames = (
                await window.electron.ipcRenderer.getProjects()
            ).map((p) => p.name);
            return !projectNames.includes(value);
        }),
});

function CreateProject() {
    const formikRef = useRef<FormikProps<typeof FORM_INITIALS>>(null);
    const [isCreatingProject, setIsCreatingProject] =
        React.useState<string>("");

    const createProject = (name: string) => {
        // console.log("CREATING PROJECT", name);
        setIsCreatingProject(name);
        window.electron.ipcRenderer
            .createProject(name)
            .then(() => {
                // console.log("CREATED PROJECT", res);
                setIsCreatingProject("[done]");
                return null;
            })
            .catch(() => {
                setIsCreatingProject("");
                // console.log(err.message);
            });
    };

    const resetForm = () => {
        formikRef.current?.resetForm();
    };

    const handleSubmit = (values: typeof FORM_INITIALS) => {
        createProject(values.projectName);
    };

    return (
        <>
            <ModalWithButton
                buttonProps={{
                    children: "Create Project",
                }}
                modalProps={{
                    title: "Create a new project",
                    modalDialogProps: {
                        sx: {
                            width: "400px",
                            maxWidth: "400px",
                        },
                    },
                }}
                onClose={resetForm}
            >
                <Formik
                    initialValues={FORM_INITIALS}
                    validationSchema={VALIDATION_SCHEMA}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <TextInput
                            name="projectName"
                            label="Project Name"
                            placeholder="Type in here…"
                            required
                        />
                        <FormButton
                            size="sm"
                            sx={{
                                mt: 2,
                            }}
                        >
                            Create Project
                        </FormButton>
                    </Form>
                </Formik>
            </ModalWithButton>
            <LoadingScreen
                show={
                    isCreatingProject !== "" && isCreatingProject !== "[done]"
                }
                value={40}
            />
        </>
    );
}

export default CreateProject;
