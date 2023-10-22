import { Sheet } from "@mui/joy";
import { Panel, PanelGroup } from "react-resizable-panels";
import DraggingProvider from "renderer/context/dragging/Dragging";
import { PanelDrag } from "renderer/context/dragging";
import { DocsProvider } from "renderer/context";
import Header from "./header/Header";
import DocuSidebar from "./docuSidebar/DocuSidebar";
import Webview from "./components/Webview";
import CodeEditor from "./components/CodeEditor";

function Main() {
    return (
        <DraggingProvider>
            <DocsProvider>
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
            </DocsProvider>
        </DraggingProvider>
    );
}

export default Main;
