import { ProjectData } from "main/store";
import React from "react";
import toast from "react-hot-toast";

export type EditorContextType = {
    projectData: ProjectData | null;
};

const EditorContext = React.createContext<EditorContextType>({
    projectData: null,
});

export function useEditorContext() {
    return React.useContext(EditorContext);
}

export type EditorContextProviderProps = {
    projectid: string;
    children: React.ReactNode;
};

export function EditorContextProvider({
    projectid,
    children,
}: EditorContextProviderProps) {
    const [projectData, setProjectData] = React.useState<ProjectData | null>(
        null
    );

    React.useEffect(() => {
        if (projectid === "") return;
        window.electron.ipcRenderer
            .invoke("get-projects", {
                id: projectid,
            })
            .then((res) => {
                setProjectData((res as ProjectData[])[0]);
                return null;
            })
            .catch(() => {
                toast.error("Error getting project data");
            });
    }, [projectid]);

    return (
        <EditorContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                projectData,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
}

export default EditorContextProvider;
