import { ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";
import { store } from "../store";

const getProject = (id: string) => {
    const project = store.get("projects").find((item) => item.id === id);
    if (!project) throw new Error("project not found");
    return project;
};

function readAllFilesInsideDirectories(directory: string) {
    function readDirectory(dirPath: string) {
        const files = fs.readdirSync(dirPath);
        const result: any = {};

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                result[file] = readDirectory(filePath); // Recurse into subdirectory
            } else if (stats.isFile()) {
                const fileContent = fs.readFileSync(filePath, "utf-8");
                result[file] = fileContent; // Store file content
            }
        });

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
    const filecontents = readAllFilesInsideDirectories(project.path);
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
