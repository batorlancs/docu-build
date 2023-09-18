import { ProjectData } from "main/store";
import {
    EllipsisVerticalIcon,
    TrashIcon,
    ServerIcon,
    FolderIcon,
} from "@heroicons/react/24/outline";
import { IconButtonWithMenu } from "renderer/components/buttons";

type ProjectItemMenuProps = {
    data: ProjectData;
};

function ProjectItemMenu({ data }: ProjectItemMenuProps) {
    const handleDelete = async () => {
        try {
            await window.electron.ipcRenderer.invoke("remove-project", {
                id: data.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenInFileExplorer = () => {
        window.electron.ipcRenderer.send("open-in-file-explorer", {
            path: data.path,
        });
    };

    const handleStartServer = async () => {
        try {
            await window.electron.ipcRenderer.invoke("start-server", {
                name: data.name,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
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
                    onClick: handleDelete,
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
    );
}

export default ProjectItemMenu;
