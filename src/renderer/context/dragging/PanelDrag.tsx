import { PanelResizeHandle } from "react-resizable-panels";
import { twMerge } from "tailwind-merge";
import { useDragging } from "./Dragging";

type PanelDragProps = {
    name: string;
    align?: "horz" | "vert";
    className?: string;
};

function PanelDrag({ name, align, className }: PanelDragProps) {
    const { dragging, setDragging } = useDragging();
    return (
        <PanelResizeHandle
            className={twMerge(
                `bg-neutral-600 ${
                    align === "vert" ? "w-[2px] hover:w-[4px]" : "h-[2px]"
                } ${dragging === name ? "w-[4px]" : "w-[2px]"}`,
                className
            )}
            onDragging={(isDragging) => {
                setDragging(isDragging ? name : "");
            }}
        />
    );
}

PanelDrag.defaultProps = {
    className: "",
    align: "vert",
};

export default PanelDrag;
