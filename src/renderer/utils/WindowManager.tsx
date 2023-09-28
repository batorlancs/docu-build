import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function WindowManager() {
    const { pathname } = useLocation();

    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0);
        // if route contains "editor" set minimum window size
        if (pathname.includes("editor")) {
            window.electron.ipcRenderer.send("set-window-size", "editor");
        } else {
            window.electron.ipcRenderer.send("set-window-size", "welcome");
        }
    }, [pathname]);

    return null;
}

export default WindowManager;
