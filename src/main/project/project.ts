/* eslint-disable no-await-in-loop */
import { ipcMain } from "electron";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";
import { store } from "../store";

const getProject = (id: string) => {
    const project = store.get("projects").find((item) => item.id === id);
    if (!project) throw new Error("project not found");
    return project;
};

async function readAllFilesInsideDirectories(directory: string) {
    const fsreaddir = promisify(fs.readdir);
    const fsreadfile = promisify(fs.readFile);
    const fsstat = promisify(fs.stat);

    // async function readDirectory(dirPath: string) {
    //     const files = await fsreaddir(dirPath);
    //     const result: any = {};

    //     files.forEach(async (file) => {
    //         const filePath = path.join(dirPath, file);
    //         const stats = await fsstat(filePath);

    //         if (stats.isDirectory()) {
    //             result[file] = await readDirectory(filePath); // Recurse into subdirectory
    //         } else if (stats.isFile()) {
    //             const fileContent = await fsreadfile(filePath, "utf-8");
    //             result[file] = fileContent; // Store file content
    //         }
    //     });

    //     return result;
    // }

    // async function readDirectory(dirPath: string) {
    //     const files = await fsreaddir(dirPath);
    //     const result: any = {};

    //     // Create an array to hold promises
    //     const promises = files.map(async (file) => {
    //         const filePath = path.join(dirPath, file);
    //         const stats = await fsstat(filePath);

    //         if (stats.isDirectory()) {
    //             result[file] = await readDirectory(filePath); // Recurse into subdirectory
    //         } else if (stats.isFile()) {
    //             const fileContent = await fsreadfile(filePath, "utf-8");
    //             result[file] = fileContent; // Store file content
    //         }
    //     });

    //     // Wait for all promises to resolve
    //     await Promise.all(promises);

    //     return result;
    // }

    type Result = {
        id: number;
        name: string;
        content: string;
        children?: Result;
    }[];

    let nodeid = 0;

    async function readDirectory(dirPath: string): Promise<Result> {
        const files = await fsreaddir(dirPath);
        const result: Result = [];

        // const promises = files.map(async (file) => {
        //     const filePath = path.join(dirPath, file);
        //     const stats = await fsstat(filePath);

        //     if (stats.isDirectory() && file !== "img") {
        //         nodeid += 1;
        //         result.push({
        //             id: nodeid,
        //             name: file,
        //             content: "",
        //             children: await readDirectory(filePath),
        //         });
        //     } else if (stats.isFile() && file.endsWith(".md")) {
        //         nodeid += 1;
        //         const fileContent = await fsreadfile(filePath, "utf-8");
        //         result.push({
        //             id: nodeid,
        //             name: file,
        //             content: fileContent,
        //         });
        //     }
        // });
        // await Promise.all(promises);

        // eslint-disable-next-line no-restricted-syntax
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = await fsstat(filePath);

            if (stats.isDirectory() && file !== "img") {
                nodeid += 1;
                result.push({
                    id: nodeid,
                    name: file,
                    content: "",
                    children: await readDirectory(filePath),
                });
            } else if (stats.isFile() && file.endsWith(".md")) {
                nodeid += 1;
                const fileContent = await fsreadfile(filePath, "utf-8");
                result.push({
                    id: nodeid,
                    name: file,
                    content: fileContent,
                });
            }
        }

        return result;
    }

    return readDirectory(directory);
}

const getProjectData = async (id: string) => {
    const project = getProject(id);
    const filecontents = await readAllFilesInsideDirectories(
        `${project.path}/docs`
    );
    return filecontents;
};

export function setProjectIpcHandlers(): void {
    ipcMain.on("get-project", (event, args) => {
        event.returnValue(getProject(args.id));
    });

    ipcMain.handle("get-project-data", (event, args) => {
        return getProjectData(args.id);
    });
}
