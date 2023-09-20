import * as fs from "fs";
import { ipcMain, shell, dialog } from "electron";

export const createFolder = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};

export const chooseDirectory = async (): Promise<string> => {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
    });
    if (result.canceled) {
        return "";
    }
    return result.filePaths[0];
};

export const setFileIpcHandlers = () => {
    ipcMain.on("open-in-file-explorer", (event, args) => {
        const { path } = args as { path: string };
        if (fs.existsSync(path)) {
            shell.showItemInFolder(path);
        }
    });
};
