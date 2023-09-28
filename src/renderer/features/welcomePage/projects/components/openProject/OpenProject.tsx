import React from "react";
import { Button } from "renderer/components/buttons";
import toast from "react-hot-toast";

function OpenProject() {
    const handleOpen = async () => {
        try {
            await window.electron.ipcRenderer.invoke("open-project");
            toast.success("The project has been added to your list.");
        } catch (error) {
            toast.error("The chosen folder is not valid.");
        }
    };

    return (
        <Button variant="soft" color="neutral" onClick={handleOpen}>
            Open
        </Button>
    );
}

export default OpenProject;
