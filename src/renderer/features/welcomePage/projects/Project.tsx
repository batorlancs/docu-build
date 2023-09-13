import React, { useEffect, useState } from "react";
import { Input, List, ListDivider } from "@mui/joy";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProjectData } from "main/store";
import ProjectItem from "./ProjectItem";
import CreateProject from "./components/createProject/CreateProject";
import OpenProject from "./components/openProject/OpenProject";

const getProjects = async (): Promise<ProjectData[]> => {
    try {
        const projects = window.electron.ipcRenderer.getProjects();
        return projects;
    } catch (err) {
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
                <CreateProject />
                <OpenProject />
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
