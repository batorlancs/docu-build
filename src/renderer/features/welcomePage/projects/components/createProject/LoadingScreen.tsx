import React from "react";
import { LinearProgress, Typography } from "@mui/joy";
import { NotClosableModal } from "renderer/components/modals";

type LoadingScreenProps = {
    show: boolean;
    value: number;
};

function LoadingScreen({ show, value }: LoadingScreenProps) {
    const [statusMsg, setStatusMsg] = React.useState<string>("");

    window.electron?.ipcRenderer.once("project-status", (args) => {
        // console.log("%c project status", "color: lime;", args);
        setStatusMsg(args as string);
    });

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
