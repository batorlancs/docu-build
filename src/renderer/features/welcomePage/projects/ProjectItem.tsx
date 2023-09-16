import {
    ListItem,
    ListItemButton,
    ListItemDecorator,
    ListItemContent,
    Typography,
    Avatar,
} from "@mui/joy";
import { ProjectData } from "../../../../main/store";
import ProjectItemMenu from "./ProjectItemMenu";

type ProjectItemProps = {
    data: ProjectData;
};

function ProjectItem({ data }: ProjectItemProps) {
    const handleButtonClick = () => {
        try {
            window.electron.ipcRenderer.startServer(data.name);
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <ListItem>
            <ListItemButton
                disabled={false}
                selected={false}
                // onClick={handleButtonClick}
            >
                <ListItemDecorator>
                    <Avatar
                        color="primary"
                        sx={{
                            borderRadius: "sm",
                            backgroundColor: data.avatar.color,
                            color: data.avatar.textColor,
                        }}
                    >
                        {data.avatar.str}
                    </Avatar>
                </ListItemDecorator>
                <ListItemContent>
                    <div className="overflow-hidden px-3">
                        <Typography color="primary">{data.name}</Typography>
                        <Typography
                            color="neutral"
                            level="body-xs"
                            noWrap
                            sx={{
                                opacity: 0.5,
                            }}
                        >
                            {data.path}
                        </Typography>
                    </div>
                </ListItemContent>
                <ListItemDecorator>
                    {/* <IconButton tooltip="Details">
                        <EllipsisVerticalIcon className="h-6 w-6" />
                    </IconButton> */}
                    <ProjectItemMenu data={data} />
                </ListItemDecorator>
            </ListItemButton>
        </ListItem>
    );
}

export default ProjectItem;
