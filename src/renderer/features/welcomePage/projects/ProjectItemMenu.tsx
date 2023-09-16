import { ProjectData } from "main/store";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IconButtonWithMenu } from "renderer/components/buttons";

type ProjectItemMenuProps = {
    data: ProjectData;
};

function ProjectItemMenu({ data }: ProjectItemMenuProps) {
    return (
        <IconButtonWithMenu
            icon={<EllipsisVerticalIcon className="h-6 w-6" />}
            menuList={[
                {
                    label: "Details",
                    icon: <EllipsisVerticalIcon />,
                    onClick: () => {},
                },
                {
                    label: "Delete",
                    icon: <EllipsisVerticalIcon />,
                    onClick: () => {},
                },
            ]}
        />
    );
}

export default ProjectItemMenu;
