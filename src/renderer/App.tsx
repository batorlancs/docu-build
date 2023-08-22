import {
    MemoryRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import { CssVarsProvider, Button } from "@mui/joy";
import theme from "./theme";
import "./App.css";
import { setWindowSize } from "./utils";

function Hello() {
    const navigate = useNavigate();

    const handleClick = async () => {
        const { ipcRenderer } = window.electron;
        const path = await ipcRenderer.getAppPath();
        console.log(path);
        setWindowSize(1800, 1600);
        navigate("/home");
    };

    const handleClick2 = async () => {
        console.log("open new window");
    };

    return (
        <div className="bg-zinc-800 font-bold h-screen flex items-center justify-center gap-6">
            <Button onClick={handleClick}>Hello</Button>
            <Button onClick={handleClick2}>Open New Window</Button>
        </div>
    );
}

function Home() {
    return (
        <div className="bg-zinc-800 font-bold h-screen flex items-center justify-center">
            Home
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
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </CssVarsProvider>
    );
}
