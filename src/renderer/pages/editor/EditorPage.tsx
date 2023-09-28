import React from "react";
import { useParams } from "react-router-dom";
import Editor from "renderer/features/editor/Editor";
import { EditorContextProvider } from "renderer/features/editor/context";

function EditorPage() {
    const { projectid } = useParams<{ projectid: string }>();
    return (
        <EditorContextProvider projectid={projectid ?? ""}>
            <Editor />
        </EditorContextProvider>
    );
}

export default EditorPage;
