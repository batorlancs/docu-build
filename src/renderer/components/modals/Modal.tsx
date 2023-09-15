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
    children: React.ReactNode;
    show: boolean;
    toggleShow: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    closeIcon?: boolean;
    modalProps?: Omit<MuiModalProps, "open" | "onClose">;
    modalDialogProps?: ModalDialogProps;
};

function Modal({
    title,
    description,
    closeIcon,
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
                {closeIcon && <ModalClose />}
                {title && (
                    <Typography
                        id="variant-modal-title"
                        level="h4"
                        marginBottom={2}
                    >
                        {title}
                    </Typography>
                )}
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
    closeIcon: true,
    modalProps: {},
    modalDialogProps: {},
};

export default Modal;
