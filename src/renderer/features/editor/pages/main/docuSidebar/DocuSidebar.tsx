import React from "react";
import { TreeView } from "@mui/x-tree-view";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { CustomTreeItem } from "./components/ContentComponent";
import { Button } from "renderer/components/buttons";

function DocuSidebar() {
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ["1", "4", "7", "8", "9"] : []
        );
    };

    return (
        <div className="p-2">
            <div className="bg-neutral-800 h-10 w-full rounded-md mb-2 p-4 flex items-center justify-end">
                <button
                    onClick={handleExpandClick}
                    type="button"
                    className="text-sm opacity-40 hover:opacity-80"
                >
                    {expanded.length === 0 ? "expand" : "collapse"}
                </button>
            </div>
            <TreeView
                defaultExpandIcon={<ChevronRightIcon className="h-4 w-4" />}
                defaultCollapseIcon={<ChevronDownIcon className="h-4 w-4" />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                multiSelect
            >
                <CustomTreeItem nodeId="1" label="Applications">
                    <CustomTreeItem nodeId="2" label="Calendar" />
                    <CustomTreeItem nodeId="3" label="Chrome" />
                    <CustomTreeItem nodeId="4" label="Webstorm">
                        <CustomTreeItem nodeId="5" label="src" />
                        <CustomTreeItem nodeId="6" label="index.js" />
                    </CustomTreeItem>
                </CustomTreeItem>
                <CustomTreeItem nodeId="7" label="Documents">
                    <CustomTreeItem nodeId="8" label="Material-UI">
                        <CustomTreeItem nodeId="9" label="src">
                            <CustomTreeItem nodeId="10" label="index.js" />
                            <CustomTreeItem nodeId="11" label="tree-view.js" />
                        </CustomTreeItem>
                    </CustomTreeItem>
                </CustomTreeItem>
            </TreeView>
        </div>
    );
}

export default DocuSidebar;
