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
import { removeProject } from "./removeproject";

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
        const { name, path } = args as { name: string; path?: string };
        console.log("create-project", name, path);
        return createProject(name, path);
    });

    ipcMain.handle("start-server", (event, args) => {
        const { name } = args as { name: string };
        return startServer(name);
    });

    ipcMain.handle("get-projects", (event, args) => {
        const { name, path } = (args as { name?: string; path?: string }) ?? {};
        return getProjectsData({
            name,
            path,
        });
    });

    ipcMain.handle("remove-project", (event, args) => {
        const { id } = args as { id: string };
        return removeProject(id);
    });
}
