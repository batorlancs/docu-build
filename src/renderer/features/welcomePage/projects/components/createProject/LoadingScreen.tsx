import React, { useEffect } from "react";
import { LinearProgress, Typography } from "@mui/joy";
import { NotClosableModal } from "renderer/components/modals";
import toast from "react-hot-toast";

type LoadingScreenProps = {
    show: boolean;
    toggleShow: () => void;
    value: number;
};

const DEFAULT_STATUS_MSG = "Executing commands";

function LoadingScreen({ show, toggleShow, value }: LoadingScreenProps) {
    const [statusMsg, setStatusMsg] =
        React.useState<string>(DEFAULT_STATUS_MSG);

    useEffect(() => {
        if (show) {
            setStatusMsg(DEFAULT_STATUS_MSG);
        }
    }, [show]);

    useEffect(() => {
        window.electron.ipcRenderer.on("project-status", (msg) => {
            console.log("got project status:", msg);
            setStatusMsg(msg as string);
            if ((msg as string) === "Something went wrong") {
                toggleShow();
                toast.error("Something went wrong.");
            }
        });

        return () => {
            window.electron.ipcRenderer.removeAllListeners("project-status");
        };
    }, [toggleShow]);

    return (
        <NotClosableModal show={show}>
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-4">
                    <Typography>{statusMsg}...</Typography>
                </div>
                <LinearProgress
                    color="primary"
                    determinate={false}
                    value={value}
                    variant="soft"
                    sx={{
                        width: "100%",
                    }}
                />
            </div>
        </NotClosableModal>
    );
}

export default LoadingScreen;
