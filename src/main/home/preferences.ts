import * as fs from "fs";
import { chooseDirectory } from "../file/file";
import { store } from "../store";

export const selectProjectsPath = async (): Promise<string | null> => {
    const path = await chooseDirectory();
    if (path === "") {
        return null;
    }
    // check if folder at path is empty
    fs.readdir(path, async (err, files) => {
        if (err) {
            throw err;
        }
        if (files.length > 0) {
            throw new Error("Folder is not empty");
        }
        // change projects path in store
        store.set("userdata", {
            ...store.get("userdata"),
            projectsPath: path,
        });
        return path;
    });

    return null;
};
