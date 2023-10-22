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

    async function readDirectory(dirPath: string) {
        const files = await fsreaddir(dirPath);
        const result: any = {};

        // Create an array to hold promises
        const promises = files.map(async (file) => {
            const filePath = path.join(dirPath, file);
            const stats = await fsstat(filePath);

            if (stats.isDirectory()) {
                result[file] = await readDirectory(filePath); // Recurse into subdirectory
            } else if (stats.isFile()) {
                const fileContent = await fsreadfile(filePath, "utf-8");
                result[file] = fileContent; // Store file content
            }
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        return result;
    }

    return readDirectory(directory);
}

// async function readAllFilesInDirectory(
//     directoryPath: string
// ): Promise<Map<string, string>> {
//     const filesContents = new Map<string, string>();
//     const readdir = promisify(fs.readdir);
//     const readFile = promisify(fs.readFile);
//     const docspath = path.join(directoryPath, "docs");

//     let files: string[] = [];
//     try {
//         files = await readdir(docspath);
//         console.log(files);
//     } catch (err) {
//         console.log(err);
//         return filesContents;
//     }

//     files.forEach(async (file) => {
//         try {
//             const filePath = path.join(docspath, file);
//             if (!isDirectory(filePath)) {
//                 const fileContent = await readFile(filePath, "utf-8");
//                 filesContents.set(file, fileContent);
//             } else {
//                 // go through this directory
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     return filesContents;
// }

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
