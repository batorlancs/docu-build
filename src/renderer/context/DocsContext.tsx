/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect } from "react";
import { useEditorContext } from "renderer/features/editor/context";

type NestedDoc = {
    id: number;
    name: string;
    content: string;
    // eslint-disable-next-line no-use-before-define
    children?: NestedDocs;
};

type NestedDocs = NestedDoc[];

// Define the shape of the context
interface DocsContextType {
    docs: NestedDocs;
    currentDoc?: NestedDoc;
    setCurrentDoc: (docid: string) => void;
}

// Create the context
const DocsContext = createContext<DocsContextType>({
    docs: [],
    currentDoc: undefined,
    setCurrentDoc: () => {},
});

// Create a provider component
function DocsProvider({ children }: React.PropsWithChildren) {
    const { projectData } = useEditorContext();
    const [docs, setDocs] = React.useState<NestedDocs>([]);
    const [currentDoc, setCurrentDoc] = React.useState<NestedDoc>();

    const setCurrDoc = (docid: string) => {
        const checkDocs = (data: NestedDocs) => {
            data.forEach((node) => {
                if (node.id.toString() === docid) {
                    setCurrentDoc(node);
                } else if (node.children) {
                    checkDocs(node.children);
                }
            });
        };

        checkDocs(docs);
    };

    useEffect(() => {
        const fun = async () => {
            if (!projectData?.id) return;
            const res = await window.electron.ipcRenderer.invoke(
                "get-project-data",
                {
                    id: projectData.id,
                }
            );
            setDocs(res as NestedDocs);
        };

        fun();
    }, [projectData?.id]);

    useEffect(() => {
        console.log(docs);
    }, [docs]);

    useEffect(() => {
        if (!currentDoc) return;
        console.log("current doc changed", currentDoc);
    });

    return (
        <DocsContext.Provider
            value={{ docs, currentDoc, setCurrentDoc: setCurrDoc }}
        >
            {children}
        </DocsContext.Provider>
    );
}

// Create a custom hook to use the context
const useDocs = () => useContext(DocsContext);

export {
    DocsProvider,
    useDocs,
    DocsContext,
    type DocsContextType,
    type NestedDocs,
    type NestedDoc,
};
