import React, { useEffect } from "react";
import { Sheet } from "@mui/joy";
import { Panel, PanelGroup } from "react-resizable-panels";
import DraggingProvider from "renderer/context/dragging/Dragging";
import { PanelDrag } from "renderer/context/dragging";
import Header from "./header/Header";
import DocuSidebar from "./docuSidebar/DocuSidebar";
import { useEditorContext } from "../../context";
import Webview from "./components/Webview";
import CodeEditor from "./components/CodeEditor";

function Main() {
    const { projectData } = useEditorContext();

    useEffect(() => {
        const fun = async () => {
            if (!projectData?.id) return;
            const res = await window.electron.ipcRenderer.invoke(
                "get-project-data",
                {
                    id: projectData.id,
                }
            );
            console.log(res);
        };

        fun();
    }, [projectData?.id]);

    return (
        <DraggingProvider>
            <PanelGroup direction="horizontal">
                <Panel
                    defaultSize={15}
                    minSize={10}
                    maxSize={40}
                    order={1}
                    // eslint-disable-next-line react/jsx-boolean-value
                    collapsible={true}
                >
                    <DocuSidebar />
                </Panel>
                <PanelDrag name="sidebar-editor" />
                <Panel order={2}>
                    <Header />
                    <Sheet
                        variant="soft"
                        sx={{
                            height: "100%",
                        }}
                    >
                        <PanelGroup direction="horizontal">
                            <Panel
                                defaultSize={50}
                                minSize={20}
                                maxSize={80}
                                order={1}
                            >
                                <CodeEditor />
                            </Panel>
                            <PanelDrag name="code-web" />
                            <Panel
                                order={2}
                                defaultSize={50}
                                minSize={20}
                                maxSize={80}
                            >
                                <Webview />
                            </Panel>
                        </PanelGroup>
                    </Sheet>
                </Panel>
            </PanelGroup>
        </DraggingProvider>
    );
}

export default Main;
