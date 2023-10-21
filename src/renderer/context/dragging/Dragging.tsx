/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from "react";

interface DraggingContextProps {
    dragging: string;
    setDragging: (id: string) => void;
}

export const DraggingContext = createContext<DraggingContextProps>({
    dragging: "",
    setDragging: () => {},
});

export const useDragging = () => React.useContext(DraggingContext);

function DraggingProvider({ children }: React.PropsWithChildren) {
    const [dragging, setDraggingState] = useState("");

    const setDragging = (id: string) => {
        setDraggingState(id);
    };

    return (
        <DraggingContext.Provider value={{ dragging, setDragging }}>
            {children}
        </DraggingContext.Provider>
    );
}

export default DraggingProvider;
