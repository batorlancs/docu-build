import * as fs from "fs";
import { execute } from "../util";
import { paths } from "../globals";

async function createDocuProject(name: string, projectPath: string) {
    await execute("npm -v && npx -v");
    await execute(`npx create-docusaurus@latest ${name} classic`, projectPath);
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
        await createDocuProject(name, path);
        return `${path}/${name}`;
    }
    if (!fs.existsSync(`${paths.projects}/${name}`)) {
        await createDocuProject(name, paths.projects);
        return `${paths.projects}/${name}`;
    }
    throw new Error("project already exists");
}

// export function startServer(name: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//         if (!fs.existsSync(`${paths.projects}/${name}`)) {
//             throw new Error("project does not exist");
//         } else {
//             console.log("npm run start at", `${paths.projects}/${name}`);
//             execute("npm run start", `${paths.projects}/${name}`)
//                 .then(() => {
//                     resolve(`server started`);
//                     return null;
//                 })
//                 .catch((err) => {
//                     reject(err);
//                 });
//         }
//     });
// }

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
