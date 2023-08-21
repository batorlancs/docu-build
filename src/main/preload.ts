// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { createWindowOptions } from "./index";

export type Channels = "ipc-example";
export type InvokeChannels = "get-app-path";

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
        getAppPath(): Promise<string> {
            return ipcRenderer.invoke("get-app-path");
        },
        // reopenWindow(): Promise<void> {
        //     return ipcRenderer.invoke("open-window-and-navigate");
        // },
        openNewWindow(options: createWindowOptions): Promise<void> {
            return new Promise((resolve, reject) => {
                ipcRenderer
                    .invoke("open-new-window", options)
                    .then((res) => {
                        if (res) {
                            resolve();
                        } else {
                            reject();
                        }
                        return true;
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        closeWindow(): void {
            ipcRenderer.send("close-window");
        },
        setWindowSize(width: number, height: number): void {
            ipcRenderer.send("set-window-size", {
                width,
                height,
            });
        },
    },
};

contextBridge.exposeInMainWorld("electron", electronHandler);

export type ElectronHandler = typeof electronHandler;
