import * as fs from "fs";
import { getMainWindow } from "../main";
import { createFolder } from "../file/file";
import { execute } from "../util";
import { addProjectData } from "./home";
import { paths } from "../globals";

export const sendProjectStatus = (status: string) => {
    getMainWindow()?.webContents.send("project-status", status);
};

// eslint-disable-next-line no-undef
let projectStatusChecker: NodeJS.Timeout | undefined;
let projectStatusCheckerLoopCount: number = 0;

/**
 * checks the status of the project creation, sends updates to the renderer process
 * @param name name of the project
 * @param path path to create the project at
 */
const checkProjectStatus = (name: string, path: string): void => {
    projectStatusCheckerLoopCount += 1;
    if (projectStatusCheckerLoopCount > 45) {
        sendProjectStatus("Something went wrong");
        clearInterval(projectStatusChecker);
        projectStatusCheckerLoopCount = 0;
    }
    // check if node_modules exists
    else if (fs.existsSync(`${path}/${name}/node_modules`)) {
        sendProjectStatus("Finishing up");
        clearInterval(projectStatusChecker);
        projectStatusCheckerLoopCount = 0;
    }
    // check if main files exists (src, docusaurus.config.js, package.json)
    else if (
        fs.existsSync(`${path}/${name}/src`) &&
        fs.existsSync(`${path}/${name}/docusaurus.config.js`) &&
        fs.existsSync(`${path}/${name}/package.json`)
    ) {
        sendProjectStatus("Installing dependencies");
    }
    // check if folfer exists
    else if (fs.existsSync(`${path}/${name}`)) {
        sendProjectStatus("Initializing files");
    }
    // if nothing exists yet
    else {
        sendProjectStatus("Creating project");
    }
};

/**
 * creates a docusaurus project with the given name at the given path
 * @param name  name of the project
 * @param toPath path to create the project at
 * @returns path to the project
 */
async function createDocuProject(
    name: string,
    toPath: string
): Promise<string> {
    await execute("node -v");
    addProjectData({
        name,
        path: `${toPath}/${name}`,
        template: "classic",
    });
    await execute(`npx create-docusaurus@latest ${name} classic`, toPath);
    clearInterval(projectStatusChecker);
    projectStatusCheckerLoopCount = 0;
    return `${toPath}/${name}`;
}

/**
 * calculates the path and starts the project creation
 * @param name name of the project
 * @param path path to create the project at
 * @returns path to the project
 */
export async function createProject(
    name: string,
    path?: string
): Promise<string> {
    /**
     * send updates to the renderer process on the status of creating the project
     */
    projectStatusChecker = setInterval(
        () => checkProjectStatus(name, path || paths.projects),
        2000
    );
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
