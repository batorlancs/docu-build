import React from "react";
import { LinearProgress } from "@mui/joy";

type LoadingScreenProps = {
    label: React.ReactNode;
    value: number;
};

function LoadingScreen({ label, value }: LoadingScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4">{label}</div>
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
    );
}

export default LoadingScreen;
