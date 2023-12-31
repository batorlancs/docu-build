/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from "path";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";
import type { createWindowOptions } from ".";
import { setHomeIpcHandlers } from "./home/home";
import { setFileIpcHandlers } from "./file/file";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;
const DEFAULT_MIN_WIDTH = 800;
const DEFAULT_MIN_HEIGHT = 600;

class AppUpdater {
    constructor() {
        log.transports.file.level = "info";
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow: BrowserWindow | null = null;
export const getMainWindow = () => mainWindow;

if (process.env.NODE_ENV === "production") {
    const sourceMapSupport = require("source-map-support");
    sourceMapSupport.install();
}

const isDebug =
    process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDebug) {
    require("electron-debug")();
}

const installExtensions = async () => {
    const installer = require("electron-devtools-installer");
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ["REACT_DEVELOPER_TOOLS"];

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload
        )
        .catch(console.log);
};

const createWindow = async (options?: createWindowOptions) => {
    const {
        navigate,
        width = DEFAULT_WIDTH,
        height = DEFAULT_HEIGHT,
        minWidth = DEFAULT_MIN_WIDTH,
        minHeight = DEFAULT_MIN_HEIGHT,
    } = options || {};

    if (isDebug) {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, "assets")
        : path.join(__dirname, "../../assets");

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
        show: false,
        width,
        height,
        minWidth,
        minHeight,
        icon: getAssetPath("icon.png"),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, "preload.js")
                : path.join(__dirname, "../../.erb/dll/preload.js"),
        },
    });

    mainWindow.loadURL(
        resolveHtmlPath(`index.html${navigate ? `#${navigate}` : ""}`)
    );

    mainWindow.on("ready-to-show", () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: "deny" };
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
};

/**
 * Add event listeners...
 */

// ipcMain.handle("get-app-path", async () => {
//     return app.getAppPath();
// });

// ipcMain.on("ipc-example", async (event, arg) => {
//     const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
//     console.log(msgTemplate(arg));
//     event.reply("ipc-example", msgTemplate("pong"));
// });

/**
 * Window handlers
 */

app.on("window-all-closed", () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("set-window-size", (event, arg) => {
    if (arg === "welcome") {
        mainWindow?.setMinimumSize(DEFAULT_MIN_WIDTH, DEFAULT_MIN_HEIGHT);
        mainWindow?.setSize(DEFAULT_WIDTH, DEFAULT_HEIGHT);
        mainWindow?.center();
    } else if (arg === "editor") {
        mainWindow?.setSize(1600, 800);
        mainWindow?.setMinimumSize(1600, 800);
        mainWindow?.center();
    }
});

app.whenReady()
    .then(() => {
        createWindow();
        app.on("activate", () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow();
        });
    })
    .catch(console.log);

/**
 * File Handlers
 */
setHomeIpcHandlers();
setFileIpcHandlers();
