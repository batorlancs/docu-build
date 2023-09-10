/* eslint import/prefer-default-export: off */
import { URL } from "url";
import path from "path";
import { exec } from "child_process";
import { app } from "electron";

export function resolveHtmlPath(htmlFileName: string) {
    if (process.env.NODE_ENV === "development") {
        const port = process.env.PORT || 1212;
        const url = new URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
}

export async function execute(
    command: string,
    commandPath?: string
): Promise<string> {
    const executePath: string = commandPath || app.getAppPath();
    return new Promise((resolve, reject) => {
        exec(command, { cwd: executePath }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            if (stdout) {
                resolve(stdout);
            }
            resolve("");
        });
    });
}
