import { Sheet } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Header from "./header/Header";
import DocuSidebar from "./docuSidebar/DocuSidebar";

function Main() {
    return (
        <PanelGroup direction="horizontal">
            <Panel
                defaultSize={30}
                minSize={20}
                maxSize={40}
                order={1}
                // eslint-disable-next-line react/jsx-boolean-value
                collapsible={true}
            >
                <DocuSidebar />
            </Panel>
            <PanelResizeHandle className="bg-neutral-800 w-[2px]" />
            <Panel order={2}>
                <Header />
                <Sheet
                    variant="soft"
                    sx={{
                        height: "100%",
                    }}
                >
                    sd
                </Sheet>
            </Panel>
        </PanelGroup>
    );
}

export default Main;
