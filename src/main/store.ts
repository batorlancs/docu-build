import Store from "electron-store";

export type ProjectData = {
    id: string;
    name: string;
    path: string;
    template: string;
    createdAt: Date;
    updatedAt: Date;
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
                path: "testpath/very/long/path",
                template: "classic",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "2",
                name: "test2",
                path: "testpath/very/long/path",
                template: "classic",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "3",
                name: "test3",
                path: "testpath/very/long/path",
                template: "classic",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    },
});
