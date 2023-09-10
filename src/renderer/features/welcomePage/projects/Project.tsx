import React, { useEffect, useState } from "react";
import { Input, Button, type ButtonProps, List, ListDivider } from "@mui/joy";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProjectData } from "main/store";
import ProjectItem from "./ProjectItem";

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
            console.log(err);
        });
};

const getProjects = async (): Promise<ProjectData[]> => {
    try {
        const projects = window.electron.ipcRenderer.getProjects();
        return projects;
    } catch (err) {
        console.log(err);
        return [];
    }
};

function Project() {
    const [projects, setProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        getProjects()
            .then((res) => {
                setProjects(res);
                return null;
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                {projects.map((project, projectIndex) => (
                    <div key={project.id}>
                        <ProjectItem data={project} />
                        {projects.length - 1 > projectIndex && <ListDivider />}
                    </div>
                ))}
            </List>
        </div>
    );
}

export default Project;
