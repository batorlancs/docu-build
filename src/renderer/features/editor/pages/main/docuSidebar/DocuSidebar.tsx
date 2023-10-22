import React, { useEffect } from "react";
import { TreeView } from "@mui/x-tree-view";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { type NestedDocs, useDocs } from "renderer/context";
import { CustomTreeItem } from "./components/ContentComponent";

function DocuSidebar() {
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string>("1");
    const { docs, setCurrentDoc } = useDocs();

    useEffect(() => {
        setCurrentDoc(selected);
    }, [selected, setCurrentDoc]);

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
        setSelected(nodeId);
    };

    const handleExpandClick = () => {
        // check for all the nodeids that have children
        const getDirectories = (data: NestedDocs, res: number[]) => {
            data.forEach((node) => {
                if (node.children) {
                    res.push(node.id);
                    getDirectories(node.children, res);
                }
            });
            return res;
        };

        const directories = getDirectories(docs, []);
        // convert number array to string array
        const strDirectories = directories.map((id) => id.toString());

        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? strDirectories : []
        );
    };

    const renderTree = (nodes: NestedDocs): React.ReactNode => {
        if (nodes.length > 0) {
            return nodes.map((node) => (
                <CustomTreeItem
                    key={node.id.toString()}
                    nodeId={node.id.toString()}
                    label={node.name}
                >
                    {Array.isArray(node.children)
                        ? renderTree(node.children)
                        : null}
                </CustomTreeItem>
            ));
        }
        return null;
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
            >
                {renderTree(docs)}
            </TreeView>
        </div>
    );
}

export default DocuSidebar;
