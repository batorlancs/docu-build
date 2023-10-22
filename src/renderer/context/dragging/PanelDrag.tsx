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
                `bg-neutral-900 hover:w-[8px] hover:bg-main-900 ${
                    align === "vert" ? "w-[5px]" : "h-[5px]"
                } ${dragging === name ? "w-[8px] bg-main-900" : "w-[5px]"}`,
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
