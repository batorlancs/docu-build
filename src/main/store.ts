import Store from "electron-store";
import { app } from "electron";
import { generateColor } from "./util";
import { createFolder } from "./file/file";

export type ProjectData = {
    id: string;
    name: string;
    path: string;
    template: string;
    createdAt: Date;
    updatedAt: Date;
    avatar: {
        color: string;
        str: string;
        textColor: string;
    };
};

export type UserData = {
    projectsPath: string;
};

type StoreType = {
    projects: ProjectData[];
    userdata: UserData;
};

const defaultProjectsPath = (): string => {
    let folderPath: string = "";
    // macos or windows
    if (process.platform === "darwin" || process.platform === "win32") {
        folderPath = `${app.getPath("documents")}/DocuBuildProjects`;
    }
    // linux
    else {
        folderPath = `${app.getPath("home")}/DocuBuildProjects`;
    }
    // create folder if it doesn't exist
    createFolder(folderPath);
    return folderPath;
};

const projectsPath = defaultProjectsPath();

export const store = new Store<StoreType>({
    defaults: {
        projects: [
            {
                id: "1",
                name: "test",
                path: `${projectsPath}/test`,
                template: "classic",
                createdAt: new Date(),
                updatedAt: new Date(),
                avatar: {
                    color: generateColor(),
                    str: "TE",
                    textColor: "#ffffff",
                },
            },
            {
                id: "2",
                name: "test2",
                path: `${projectsPath}/test2`,
                template: "classic",
                createdAt: new Date(),
                updatedAt: new Date(),
                avatar: {
                    color: generateColor(),
                    str: "TE",
                    textColor: "#ffffff",
                },
            },
            {
                id: "3",
                name: "test3",
                path: `${projectsPath}/test3`,
                template: "classic",
                createdAt: new Date(),
                updatedAt: new Date(),
                avatar: {
                    color: generateColor(),
                    str: "TE",
                    textColor: "#ffffff",
                },
            },
        ],
        userdata: {
            projectsPath,
        },
    },
});

store.clear();
