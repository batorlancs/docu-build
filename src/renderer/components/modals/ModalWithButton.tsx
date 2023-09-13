import React from "react";
import Modal, { ModalProps } from "./Modal";
import { useShow } from "../../hooks";
import Button, { ButtonProps } from "../buttons/Button";

type ModalWithButtonProps = {
    modalProps: Omit<ModalProps, "show" | "toggleShow" | "children">;
    buttonProps: Omit<ButtonProps, "onClick">;
    children: React.ReactNode;
    onClose?: () => void;
};

function ModalWithButton({
    modalProps,
    buttonProps,
    children,
    onClose,
}: ModalWithButtonProps) {
    const { show, toggleShow } = useShow();

    return (
        <>
            <Button onClick={toggleShow} {...buttonProps} />
            <Modal
                show={show}
                toggleShow={() => {
                    toggleShow();
                    onClose?.();
                }}
                {...modalProps}
            >
                {children}
            </Modal>
        </>
    );
}

ModalWithButton.defaultProps = {
    onClose: undefined,
};

export default ModalWithButton;
