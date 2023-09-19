import { app } from "electron";
import { store } from "./store";

const appPath = app.getAppPath();

export const paths = {
    app: appPath,
    projects: store.get("userdata").projectsPath,
};
