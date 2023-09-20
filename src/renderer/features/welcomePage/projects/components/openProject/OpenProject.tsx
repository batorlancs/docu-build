import React from "react";
import { Button } from "renderer/components/buttons";

function OpenProject() {
    const handleOpen = async () => {
        try {
            await window.electron.ipcRenderer.invoke("open-project");
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <Button variant="soft" color="neutral" onClick={handleOpen}>
            Open
        </Button>
    );
}

export default OpenProject;
