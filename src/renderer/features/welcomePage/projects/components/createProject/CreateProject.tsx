import React, { useRef } from "react";
import { Modal } from "renderer/components/modals";
import { Formik, Form, FormikProps } from "formik";
import { FormButton, TextInput } from "renderer/components/forms";
import * as yup from "yup";
import { ProjectData } from "main/store";
import toast from "react-hot-toast";
import { Button } from "renderer/components/buttons";
import { useShow } from "renderer/hooks";
import LoadingScreen from "./LoadingScreen";

const FORM_INITIALS = {
    projectName: "",
};

const VALIDATION_SCHEMA = yup.object({
    projectName: yup
        .string()
        .min(3, "Project name must be at least 3 characters long.")
        .max(20, "Project name must not exceed 20 characters.")
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
                (await window.electron.ipcRenderer.invoke(
                    "get-projects"
                )) as ProjectData[]
            ).map((p) => p.name);
            return !projectNames.includes(value);
        }),
});

function CreateProject() {
    const { show, toggleShow } = useShow();
    const formikRef = useRef<FormikProps<typeof FORM_INITIALS>>(null);
    const [isCreatingProject, setIsCreatingProject] =
        React.useState<string>("");

    const createProject = (name: string) => {
        // console.log("CREATING PROJECT", name);
        setIsCreatingProject(name);
        window.electron.ipcRenderer
            .invoke("create-project", {
                name,
            })
            .then(() => {
                setIsCreatingProject("[done]");
                toast.success(`Project "${name}" has been created.`);
                toggleShow();
                return null;
            })
            .catch(() => {
                setIsCreatingProject("");
                toast.error(`Failed to create project "${name}".`);
                toggleShow();
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
            <Button
                onClick={() => {
                    resetForm();
                    toggleShow();
                }}
            >
                Create Project
            </Button>
            <Modal
                show={show}
                toggleShow={toggleShow}
                title="Create a new project"
                modalDialogProps={{
                    sx: {
                        width: "400px",
                        maxWidth: "400px",
                    },
                }}
            >
                <Formik
                    innerRef={formikRef}
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
            </Modal>
            <LoadingScreen
                show={
                    isCreatingProject !== "" && isCreatingProject !== "[done]"
                }
                toggleShow={() => {
                    setIsCreatingProject("");
                }}
                value={40}
            />
        </>
    );
}

export default CreateProject;
