import React from "react";
import Modal, { ModalProps } from "./Modal";
import { useShow } from "../../hooks";
import Button, { ButtonProps } from "../buttons/Button";

type ModalWithButtonProps = {
    modalProps: Omit<ModalProps, "show" | "toggleShow" | "children">;
    buttonProps: Omit<ButtonProps, "onClick">;
    children: (toggleShow: () => void) => React.JSX.Element;
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
                {children(toggleShow)}
            </Modal>
        </>
    );
}

ModalWithButton.defaultProps = {
    onClose: undefined,
};

export default ModalWithButton;
