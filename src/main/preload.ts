// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

export type Channels =
    | "ipc-example"
    | "project-status"
    | "projects-changed"
    | "userdata-changed"
    | "open-in-file-explorer"
    | "set-window-size";

export type InvokeChannels =
    | "get-app-path"
    | "create-project"
    | "start-server"
    | "get-projects"
    | "get-userdata"
    | "remove-project"
    | "open-project"
    | "select-projects-path";

const electronHandler = {
    ipcRenderer: {
        send(channel: Channels, ...args: unknown[]) {
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
    },
};

contextBridge.exposeInMainWorld("electron", electronHandler);

export type ElectronHandler = typeof electronHandler;
