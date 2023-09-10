import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { execute } from "../util";
import { paths } from "../globals";
import { store, ProjectData } from "../store";

export function getProjectsData(): ProjectData[] {
    return store.get("projects");
}

function addProjectData(
    data: Omit<ProjectData, "id" | "createdAt" | "updatedAt">
): void {
    const projectsData = getProjectsData();
    // if name is already taken do nothing
    if (projectsData.find((project) => project.name === data.name)) {
        return;
    }
    projectsData.push({
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
    });
    store.set("projects", projectsData);
}

async function createDocuProject(
    name: string,
    toPath: string
): Promise<string> {
    await execute("node -v");
    await execute(`npx create-docusaurus@latest ${name} classic`, toPath);
    addProjectData({
        name,
        path: `${toPath}/${name}`,
        template: "classic",
    });
    return `${toPath}/${name}`;
}

function createFolder(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

export async function createProject(
    name: string,
    path?: string
): Promise<string> {
    createFolder(paths.appdata);
    createFolder(paths.projects);
    // create project at the correct path
    if (path) {
        return createDocuProject(name, path);
    }
    if (!fs.existsSync(`${paths.projects}/${name}`)) {
        return createDocuProject(name, paths.projects);
    }
    throw new Error("project already exists");
}

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
