import React, { useEffect, useState } from "react";
import { Input, List, ListDivider } from "@mui/joy";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProjectData } from "main/store";
import ProjectItem from "./ProjectItem";
import CreateProject from "./components/createProject/CreateProject";
import OpenProject from "./components/openProject/OpenProject";

function Project() {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [search, setSearch] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getProjects = async (): Promise<ProjectData[]> => {
            try {
                return window.electron.ipcRenderer.getProjects({
                    name: search,
                });
            } catch (err) {
                return [];
            }
        };

        getProjects()
            .then((res) => {
                setProjects(res);
                if (projects.length === 0) setError("No projects found");
                else setError("");
                return null;
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [search, projects.length]);

    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <Input
                    placeholder="Search projects"
                    endDecorator={<MagnifyingGlassIcon className="w-5 h-5" />}
                    className="w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                {projects.length > 0 ? (
                    projects.map((project, projectIndex) => (
                        <div key={project.id}>
                            <ProjectItem data={project} />
                            {projects.length - 1 > projectIndex && (
                                <ListDivider />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-24 text-back-400">
                        {error}
                    </div>
                )}
            </List>
        </div>
    );
}

export default Project;
