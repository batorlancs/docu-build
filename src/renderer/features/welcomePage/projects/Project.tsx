import React from "react";
import {
    Input,
    Button,
    type ButtonProps,
    List,
    ListItem,
    ListItemButton,
    ListItemDecorator,
    ListItemContent,
    ListDivider,
    Typography,
    Avatar,
} from "@mui/joy";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function OutlinedButton({
    children,
    ...props
}: Omit<ButtonProps, "variant" | "className">) {
    return (
        <Button
            variant="soft"
            color="neutral"
            className="whitespace-nowrap"
            {...props}
        >
            {children}
        </Button>
    );
}

const createProject = () => {
    window.electron.ipcRenderer
        .createProject("firstdocu")
        .then((res) => {
            console.log("CREATED PROJECT", res);
            return null;
        })
        .catch((err: Error) => {
            console.log("project already exists");
            console.log(err.message);
        });
};

const startServer = () => {
    window.electron.ipcRenderer
        .startServer("firstdocu")
        .then(() => {
            console.log("STARTED SERVER");
            return null;
        })
        .catch((err) => {
            console.log("project already exists");
            console.log(err);
        });
};

function Project() {
    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <Input
                    placeholder="Search projects"
                    endDecorator={<MagnifyingGlassIcon className="w-5 h-5" />}
                    className="w-full"
                />
                <OutlinedButton onClick={createProject}>
                    New Project
                </OutlinedButton>
                <OutlinedButton onClick={startServer}>Open</OutlinedButton>
            </div>
            <List
                variant="outlined"
                sx={{
                    marginTop: "18px",
                    borderRadius: "sm",
                }}
            >
                <ListItem>
                    <ListItemButton disabled={false} selected={false}>
                        <ListItemDecorator>
                            <Avatar
                                color="primary"
                                sx={{
                                    borderRadius: "sm",
                                }}
                            >
                                N
                            </Avatar>
                        </ListItemDecorator>
                        <ListItemContent>
                            <div className="overflow-hidden pl-3">
                                <Typography color="primary">name</Typography>
                                <Typography
                                    color="neutral"
                                    level="body-xs"
                                    sx={{
                                        opacity: 0.5,
                                    }}
                                >
                                    path/to/something/really/really/long/asdadasdsadsahdiashdiuashdiashdiashdiahdha
                                </Typography>
                            </div>
                        </ListItemContent>
                    </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                    <ListItemButton disabled={false} selected={false}>
                        <ListItemDecorator>
                            <Avatar
                                color="primary"
                                sx={{
                                    borderRadius: "sm",
                                }}
                            >
                                PN
                            </Avatar>
                        </ListItemDecorator>
                        <ListItemContent>
                            <div className="overflow-hidden pl-3">
                                <Typography color="primary">
                                    project name 2
                                </Typography>
                                <Typography
                                    color="neutral"
                                    level="body-xs"
                                    sx={{
                                        opacity: 0.5,
                                    }}
                                >
                                    path/to/something/really/really/long/asdadasdsadsahdiashdiuashdiashdiashdiahdha
                                </Typography>
                            </div>
                        </ListItemContent>
                    </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                    <ListItemButton disabled={false} selected={false}>
                        <ListItemDecorator>
                            <Avatar
                                color="primary"
                                sx={{
                                    borderRadius: "sm",
                                }}
                            >
                                S
                            </Avatar>
                        </ListItemDecorator>
                        <ListItemContent>
                            <div className="overflow-hidden pl-3">
                                <Typography color="primary">
                                    something
                                </Typography>
                                <Typography
                                    color="neutral"
                                    level="body-xs"
                                    sx={{
                                        opacity: 0.5,
                                    }}
                                >
                                    path/to/something/really/really/long/asdadasdsadsahdiashdiuashdiashdiashdiahdha
                                </Typography>
                            </div>
                        </ListItemContent>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
}

export default Project;
