import * as fs from "fs";
import { store } from "../store";
import { getProjectsData } from "./home";

/**
 * removes a project from the projects data store
 * @param id id of the project to remove
 */
async function removeProjectData(id: string): Promise<void> {
    const projectsData = getProjectsData();
    const index = projectsData.findIndex((project) => project.id === id);
    if (index !== -1) {
        projectsData.splice(index, 1);
    } else {
        throw new Error("project data does not exist");
    }
    store.set("projects", projectsData);
}

/**
 * removes a project from the projects folder
 * @param id id of the project to remove
 */
export const removeProject = async (id: string): Promise<void> => {
    // get project path
    const projectsData = getProjectsData();
    const project = projectsData.find((item) => item.id === id);
    if (!project) {
        throw new Error("project does not exist");
    }
    // remove folder at path
    fs.rm(project.path, { recursive: true }, async (err1) => {
        try {
            await removeProjectData(id);
            if (err1) {
                throw new Error(`Error removing folder ${err1.message}`);
            }
        } catch (err2) {
            if (err1) {
                throw new Error(
                    `Error removing folder: ${
                        err1.message
                    } and error removing data ${(err2 as Error).message}`
                );
            } else {
                throw new Error(
                    `Error removing data ${(err2 as Error).message}`
                );
            }
        }
    });
};
