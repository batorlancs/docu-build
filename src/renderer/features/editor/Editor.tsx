import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useEditorContext } from "./context";
import { Sheet } from "@mui/joy";
import Header from "./header/Header";

function Editor() {
    // const { projectData } = useEditorContext();

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div className="grid grid-cols-[300px_1fr] h-full">
                <Sheet className="bg-black h-full border-r border-neutral-800 p-4">
                    df
                </Sheet>
                <Sheet>
                    <Header />
                    <Routes>
                        <Route path="/" />
                    </Routes>
                </Sheet>
            </div>
        </div>
    );
}

export default Editor;
