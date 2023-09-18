import Store from "electron-store";
import { paths } from "./globals";
import { generateColor } from "./util";

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

type StoreType = {
    projects: ProjectData[];
};

export const store = new Store<StoreType>({
    defaults: {
        projects: [
            {
                id: "1",
                name: "test",
                path: `${paths.projects}/test`,
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
                path: `${paths.projects}/test2`,
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
                path: `${paths.projects}/test3`,
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
    },
});

store.clear();
