import * as fs from "fs";
import { ipcMain, shell } from "electron";

export const createFolder = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};

export const setFileIpcHandlers = () => {
    ipcMain.on("open-in-file-explorer", (event, args) => {
        const { path } = args as { path: string };
        if (fs.existsSync(path)) {
            shell.showItemInFolder(path);
        }
    });
};
