import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { CssVarsProvider, Button, Sheet } from "@mui/joy";
import theme from "./theme";
import "./App.css";
// import "tailwindcss/tailwind.css";

function Hello() {
    const { ipcRenderer } = window.electron;

    const handleClick = async () => {
        // const path = (await ipcRenderer.invoke('get-app-path')) as string;
        const path = await ipcRenderer.getAppPath();
        console.log(path);
    };

    return (
        // <Sheet className="bg-green-500 flex items-center">
        // </Sheet>
        <div className="bg-zinc-800 font-bold h-screen flex items-center justify-center">
            <Button onClick={handleClick}>Hello</Button>
        </div>
    );
}

export default function App() {
    return (
        <CssVarsProvider
            theme={theme}
            defaultMode="dark"
            modeStorageKey="demo_dark-mode-by-default"
        >
            <Router>
                <Routes>
                    <Route path="/" element={<Hello />} />
                </Routes>
            </Router>
        </CssVarsProvider>
    );
}
