// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
// import { createWindowOptions } from "./index";
import { ProjectData } from "./store";
import { SearchOptions } from "./home/home";

export type Channels =
    | "ipc-example"
    | "project-status"
    | "projects-changed"
    | "open-in-file-explorer"
    | "open-in-terminal";
export type InvokeChannels =
    | "get-app-path"
    | "get-files"
    | "get-file"
    | "create-folder"
    | "get-folder-structure"
    | "create-project";

const electronHandler = {
    ipcRenderer: {
        sendMessage(channel: Channels, ...args: unknown[]) {
            ipcRenderer.send(channel, ...args);
        },
        on(channel: Channels, func: (...args: unknown[]) => void) {
            const subscription = (
                _event: IpcRendererEvent,
                ...args: unknown[]
            ) => func(...args);
            ipcRenderer.on(channel, subscription);

            return () => {
                ipcRenderer.removeListener(channel, subscription);
            };
        },
        once(channel: Channels, func: (...args: unknown[]) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
        invoke(channel: InvokeChannels, ...args: unknown[]): Promise<unknown> {
            return ipcRenderer.invoke(channel, ...args);
        },
        removeAllListeners(channel: Channels) {
            ipcRenderer.removeAllListeners(channel);
        },
        // getAppPath(): Promise<string> {
        //     return ipcRenderer.invoke("get-app-path");
        // },
        // openNewWindow(options: createWindowOptions): Promise<void> {
        //     return new Promise((resolve, reject) => {
        //         ipcRenderer
        //             .invoke("open-new-window", options)
        //             .then((res) => {
        //                 if (res) {
        //                     resolve();
        //                 } else {
        //                     reject();
        //                 }
        //                 return true;
        //             })
        //             .catch((err) => {
        //                 reject(err);
        //             });
        //     });
        // },
        // closeWindow(): void {
        //     ipcRenderer.send("close-window");
        // },
        // setWindowSize(width: number, height: number): void {
        //     ipcRenderer.send("set-window-size", {
        //         width,
        //         height,
        //     });
        // },
        createProject(name: string, path?: string): Promise<string> {
            return ipcRenderer.invoke("create-project", {
                name,
                path,
            });
        },
        startServer(name: string): Promise<string> {
            return ipcRenderer.invoke("start-server", {
                name,
            });
        },
        getProjects(search?: SearchOptions): Promise<ProjectData[]> {
            return ipcRenderer.invoke("get-projects-data", search);
        },
        removeProject(id: string): Promise<void> {
            return ipcRenderer.invoke("remove-project-data", id);
        },
    },
};

contextBridge.exposeInMainWorld("electron", electronHandler);

export type ElectronHandler = typeof electronHandler;
