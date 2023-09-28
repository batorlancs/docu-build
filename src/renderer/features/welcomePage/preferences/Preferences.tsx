import { FolderIcon } from "@heroicons/react/24/outline";
import { Typography } from "@mui/joy";
import { UserData } from "main/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "renderer/components/buttons";

function Preferences() {
    const [projectsPath, setProjectsPath] = useState<string>("");

    useEffect(() => {
        window.electron.ipcRenderer
            .invoke("get-userdata")
            .then((res) => {
                setProjectsPath((res as UserData).projectsPath);
                return null;
            })
            .catch((err) => {
                console.log(err);
            });

        window.electron.ipcRenderer.on("userdata-changed", (userdata) => {
            setProjectsPath((userdata as UserData).projectsPath);
        });

        return () => {
            window.electron.ipcRenderer.removeAllListeners("userdata-changed");
        };
    }, []);

    const handleClick = async () => {
        try {
            const selectedPath = await window.electron.ipcRenderer.invoke(
                "select-projects-path"
            );
            if (selectedPath != null) {
                toast.success("Path selected");
            }
        } catch (err) {
            toast.error("Folder must be empty");
        }
    };

    return (
        <div>
            <Typography marginBottom={4} level="h4">
                Preferences
            </Typography>
            <Typography marginBottom={1}>Projects folder</Typography>
            <Button
                fullWidth
                sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                variant="soft"
                color="neutral"
                tooltip={`Click to change path: ${projectsPath}`}
                tooltipProps={{
                    enterDelay: 250,
                }}
                onClick={handleClick}
            >
                <div className="flex items-center w-full">
                    <FolderIcon className="w-5 h-5 flex-shrink-0" />
                    <Typography
                        marginLeft={2}
                        noWrap
                        level="body-sm"
                        fontWeight="md"
                    >
                        {projectsPath}
                    </Typography>
                </div>
            </Button>
        </div>
    );
}

export default Preferences;
