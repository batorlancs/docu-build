import React from "react";
import { ModalWithButton } from "renderer/components/modals";

function OpenProject() {
    return (
        <ModalWithButton
            buttonProps={{
                color: "neutral",
                variant: "soft",
                children: "Open",
            }}
            modalProps={{
                title: "Open project",
                description: "Create a new project",
            }}
        >
            {/* something for children */}
        </ModalWithButton>
    );
}

export default OpenProject;
