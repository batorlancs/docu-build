import {
    ListItem,
    ListItemButton,
    ListItemDecorator,
    ListItemContent,
    Typography,
    Avatar,
} from "@mui/joy";
import { ProjectData } from "../../../../main/store";

type ProjectItemProps = {
    data: ProjectData;
};

function ProjectItem({ data }: ProjectItemProps) {
    return (
        <ListItem>
            <ListItemButton disabled={false} selected={false}>
                <ListItemDecorator>
                    <Avatar
                        color="primary"
                        sx={{
                            borderRadius: "sm",
                        }}
                    >
                        SM
                    </Avatar>
                </ListItemDecorator>
                <ListItemContent>
                    <div className="overflow-hidden pl-3">
                        <Typography color="primary">{data.name}</Typography>
                        <Typography
                            color="neutral"
                            level="body-xs"
                            sx={{
                                opacity: 0.5,
                            }}
                        >
                            {data.path}
                        </Typography>
                    </div>
                </ListItemContent>
            </ListItemButton>
        </ListItem>
    );
}

export default ProjectItem;
