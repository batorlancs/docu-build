import * as fs from "fs";
import { ipcMain } from "electron";
import { v4 as uuidv4 } from "uuid";
import { getMainWindow } from "../main";
import {
    execute,
    generateColor,
    generatePrefixFromName,
    getTextColorForBackground,
} from "../util";
import { paths } from "../globals";
import { store, ProjectData } from "../store";
import { createProject } from "./createproject";

export type SearchOptions = {
    name?: string;
    path?: string;
};

export const getProjectsData = (search?: SearchOptions): ProjectData[] => {
    const projects = store.get("projects");
    if (search && search.name) {
        return projects.filter((project) => {
            return project.name.includes(search.name?.toLowerCase() ?? "");
        });
    }
    if (search && search.path) {
        return projects.filter((project) => {
            return project.path.includes(search.path?.toLowerCase() ?? "");
        });
    }
    return projects;
};

export const addProjectData = (
    data: Omit<ProjectData, "id" | "createdAt" | "updatedAt" | "avatar">
): void => {
    const projectsData = getProjectsData();
    // if name is already taken do nothing
    if (projectsData.find((project) => project.name === data.name)) {
        return;
    }
    const randomColor = generateColor();
    projectsData.push({
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: {
            color: randomColor,
            str: generatePrefixFromName(data.name),
            textColor: getTextColorForBackground(randomColor),
        },
        ...data,
    });
    store.set("projects", projectsData);
};

export async function removeProjectData(id: string): Promise<void> {
    const projectsData = getProjectsData();
    const index = projectsData.findIndex((project) => project.id === id);
    if (index !== -1) {
        projectsData.splice(index, 1);
    } else {
        throw new Error("project data does not exist");
    }
    store.set("projects", projectsData);
}

const removeProject = async (id: string): Promise<void> => {
    // get project path
    const projectsData = getProjectsData();
    const project = projectsData.find((item) => item.id === id);
    if (!project) {
        throw new Error("project does not exist");
    }
    // remove folder at path
    fs.rmdir(project.path, { recursive: true }, async (err) => {
        await removeProjectData(id);
        if (err) {
            throw new Error(`Error removing folder: ${err.message}`);
        }
    });
};

store.onDidChange("projects", (projects) => {
    getMainWindow()?.webContents.send("projects-changed", projects);
});

export async function startServer(name: string): Promise<void> {
    if (!fs.existsSync(`${paths.projects}/${name}`)) {
        throw new Error("project does not exist");
    } else {
        try {
            await execute("npm run start", `${paths.projects}/${name}`);
        } catch (err) {
            throw new Error("failed to start server");
        }
    }
}

export function setHomeIpcHandlers(): void {
    ipcMain.handle("create-project", (event, args) => {
        return createProject(args.name, args.path);
    });

    ipcMain.handle("start-server", (event, args) => {
        return startServer(args.name);
    });

    ipcMain.handle("get-projects-data", (event, args) => {
        return getProjectsData(args);
    });

    ipcMain.handle("remove-project-data", (event, args) => {
        return removeProject(args);
    });
}
