import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy";
import theme from "./theme";
import "./App.css";
import { WelcomePage } from "./pages";

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
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </CssVarsProvider>
    );
}
