import React from "react";
import {
    Modal as MuiModal,
    ModalDialog,
    ModalClose,
    Typography,
    ModalProps as MuiModalProps,
    ModalDialogProps,
} from "@mui/joy";

export type ModalProps = {
    title?: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    show: boolean;
    toggleShow: () => void;
    modalProps?: Omit<MuiModalProps, "open" | "onClose">;
    modalDialogProps?: ModalDialogProps;
};

function Modal({
    title,
    description,
    children,
    show,
    toggleShow,
    modalProps,
    modalDialogProps,
}: ModalProps) {
    return (
        <MuiModal open={show} onClose={toggleShow} {...modalProps}>
            <ModalDialog
                aria-labelledby="variant-modal-title"
                aria-describedby="variant-modal-description"
                {...modalDialogProps}
            >
                <ModalClose />
                <Typography
                    id="variant-modal-title"
                    level="h4"
                    marginBottom={2}
                >
                    {title}
                </Typography>
                {description && (
                    <Typography id="variant-modal-description">
                        {description}
                    </Typography>
                )}
                {children}
            </ModalDialog>
        </MuiModal>
    );
}

Modal.defaultProps = {
    title: undefined,
    description: undefined,
    modalProps: {},
    modalDialogProps: {},
};

export default Modal;
