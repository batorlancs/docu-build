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
            await window.electron.ipcRenderer.removeProject(data.id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenInFileExplorer = async () => {
        window.electron.ipcRenderer.sendMessage("open-in-file-explorer", {
            path: data.path,
        });
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
                    onClick: () => {},
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
