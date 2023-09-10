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
import { app, BrowserWindow, shell, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import * as fs from "fs";
import { exec } from "child_process";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";
import type { createWindowOptions } from ".";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

class AppUpdater {
    constructor() {
        log.transports.file.level = "info";
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.handle("get-app-path", async () => {
    return app.getAppPath();
});

ipcMain.on("ipc-example", async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply("ipc-example", msgTemplate("pong"));
});

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

ipcMain.on("close-window", async () => {
    if (mainWindow) {
        mainWindow.close();
    }
});

ipcMain.on("set-window-size", (_, arg) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = arg as {
        width: number;
        height: number;
    };
    if (mainWindow) {
        mainWindow.setSize(width, height);
    }
});

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== "darwin") {
        app.quit();
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
 * handlers
 */

ipcMain.handle("get-files", async () => {
    const files = fs.readdirSync(app.getAppPath());
    return files;
});

ipcMain.handle("get-file", async (event, arg) => {
    const file = fs.readFileSync(`${app.getAppPath()}/${arg}`);
    return file;
});

ipcMain.handle("create-folder", async (event, arg) => {
    fs.mkdirSync(`${app.getAppPath()}/${arg}`);
});

ipcMain.handle("get-folder-structure", async (event, arg) => {
    const folderStructure = fs.readdirSync(`${app.getAppPath()}/${arg}`);
    return folderStructure;
});

async function execute(command: string, commandPath?: string) {
    const executePath: string = commandPath || app.getAppPath();
    return new Promise((resolve, reject) => {
        exec(command, { cwd: executePath }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stdout) {
                resolve(stdout);
            }
            if (stderr) {
                reject(stderr);
            }
        });
    });
}

async function createProject(name: string, projectPath: string) {
    try {
        await execute("npm -v && npx -v");
        await execute(
            `npx create-docusaurus@latest ${name} classic`,
            projectPath
        );
    } catch (error) {
        console.log("an error occured creating the project");
    }
}

ipcMain.handle("create-project", async (event, args) => {
    // check if projects folder exists in app, if not create it
    if (!fs.existsSync(`${app.getAppPath()}/projects`)) {
        fs.mkdirSync(`${app.getAppPath()}/projects`);
    }
    if (args.path) {
        await createProject(args.name, args.path);
    } else if (!fs.existsSync(`${app.getAppPath()}/projects/${args.name}`)) {
        await createProject(args.name, `${app.getAppPath()}/projects`);
    }
});

ipcMain.handle("start-server", async (event, args) => {
    if (!fs.existsSync(`${app.getAppPath()}/projects/${args.name}`)) {
        throw new Error("project does not exist");
    } else {
        execute("npm run start", `${app.getAppPath()}/projects/${args.name}`)
            .then((msg) => {
                return `server started with message: ${msg}`;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
});
