import React, { useEffect } from "react";
import { LinearProgress, Typography } from "@mui/joy";
import { NotClosableModal } from "renderer/components/modals";

type LoadingScreenProps = {
    show: boolean;
    value: number;
};

const DEFAULT_STATUS_MSG = "Executing commands";

function LoadingScreen({ show, value }: LoadingScreenProps) {
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
        });

        return () => {
            window.electron.ipcRenderer.removeAllListeners("project-status");
        };
    }, []);

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
