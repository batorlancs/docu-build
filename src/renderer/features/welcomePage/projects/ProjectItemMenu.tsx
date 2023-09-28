import { ProjectData } from "main/store";
import {
    EllipsisVerticalIcon,
    TrashIcon,
    ServerIcon,
    FolderIcon,
} from "@heroicons/react/24/outline";
import { IconButtonWithMenu } from "renderer/components/buttons";
import { useShow } from "renderer/hooks";
import toast from "react-hot-toast";
import DeleteProjectModal from "./components/deleteProject/DeleteProjectModal";

type ProjectItemMenuProps = {
    data: ProjectData;
};

function ProjectItemMenu({ data }: ProjectItemMenuProps) {
    const { show, toggleShow } = useShow();

    const handleDelete = async () => {
        try {
            await window.electron.ipcRenderer.invoke("remove-project", {
                id: data.id,
            });
            toast.success(`Project "${data.name}" has been deleted.`);
        } catch (err) {
            toast.error(`Failed to delete project "${data.name}".`);
        }
    };

    const handleOpenInFileExplorer = () => {
        window.electron.ipcRenderer.send("open-in-file-explorer", {
            path: data.path,
        });
    };

    const handleStartServer = async () => {
        try {
            // await window.electron.ipcRenderer.invoke("start-server", {
            //     name: data.name,
            // });
            toast.promise(
                window.electron.ipcRenderer.invoke("start-server", {
                    name: data.name,
                }),
                {
                    loading: "Starting server...",
                    success: `Server "${data.name}" has been started.`,
                    error: `Failed to start server "${data.name}".`,
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <IconButtonWithMenu
                icon={<EllipsisVerticalIcon />}
                menuList={[
                    {
                        label: "Open in file explorer",
                        icon: <FolderIcon />,
                        onClick: handleOpenInFileExplorer,
                    },
                    {
                        label: "Start server",
                        icon: <ServerIcon />,
                        onClick: handleStartServer,
                        menuItemProps: {
                            divider: true,
                        },
                    },
                    {
                        label: "Delete",
                        icon: <TrashIcon />,
                        onClick: toggleShow,
                        menuItemProps: {
                            sx: {
                                color: "error.main",
                            },
                        },
                    },
                ]}
                buttonSx={{
                    marginRight: "8px",
                }}
            />
            <DeleteProjectModal
                data={data}
                show={show}
                toggleShow={toggleShow}
                onConfirm={handleDelete}
            />
        </>
    );
}

export default ProjectItemMenu;
