import { app } from "electron";

const appPath = app.getAppPath();

export const paths = {
    app: appPath,
    appdata: `${appPath}/appdata`,
    projects: `${appPath}/appdata/projects`,
};

export const files = {};
