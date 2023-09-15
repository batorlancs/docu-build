import Modal, { ModalProps } from "./Modal";

type NotClosableModalProps = Omit<ModalProps, "toggleShow" | "closeIcon">;

function NotClosableModal(props: NotClosableModalProps) {
    return <Modal {...props} toggleShow={() => {}} closeIcon={false} />;
}

export default NotClosableModal;
