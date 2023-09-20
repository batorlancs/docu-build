import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { chooseDirectory } from "../file/file";
import { addProjectData } from "./home";

export const openProject = async (): Promise<void> => {
    const path = await chooseDirectory();
    if (!path || path === "") {
        throw new Error("no path selected");
    }
    // check if docu-build.config.json exists
    if (!fs.existsSync(`${path}/docu-build.config.json`)) {
        throw new Error("docu-build.config.json does not exist");
    }
    // add project to projects data store
    // open project in editor
    addProjectData({
        name: path.split("/").pop() ?? uuidv4(),
        path,
        template: "classic",
    });
};
