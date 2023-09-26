import * as fs from "fs";
import { chooseDirectory } from "../file/file";
import { store } from "../store";

export const selectProjectsPath = async (): Promise<string | null> => {
    const readdirPromise = (path: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject(err);
                }
                if (files.length > 0) {
                    reject(new Error("Folder is not empty"));
                }
                resolve();
            });
        });
    };

    const path = await chooseDirectory();
    if (path === "") {
        return null;
    }
    // check if folder at path is empty
    // fs.readdir(path, async (err, files) => {
    //     if (err) {
    //         throw err;
    //     }
    //     if (files.length > 0) {
    //         throw new Error("Folder is not empty");
    //     }
    //     // change projects path in store
    //     store.set("userdata", {
    //         ...store.get("userdata"),
    //         projectsPath: path,
    //     });
    //     return path;
    // });
    await readdirPromise(path);
    store.set("userdata", {
        ...store.get("userdata"),
        projectsPath: path,
    });
    return path;
};
