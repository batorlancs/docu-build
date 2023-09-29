/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { CubeIcon } from "@heroicons/react/24/outline";
import Sidebar from "./sidebar/Sidebar";
import Main from "./pages/main/Main";

function Editor() {
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Sidebar
                items={[
                    {
                        title: "Home",
                        icon: CubeIcon,
                        component: Main,
                    },
                    {
                        title: "Project",
                        icon: CubeIcon,
                        component: () => <div>project</div>,
                    },
                    {
                        title: "Settings",
                        icon: CubeIcon,
                        component: () => <div>project</div>,
                    },
                ]}
            />
        </div>
    );
}

export default Editor;
