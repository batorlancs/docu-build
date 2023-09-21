import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import {
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider } from "@mui/joy";
import { Toaster } from "react-hot-toast";
import { joyTheme, materialTheme } from "./theme";
import "./App.css";
import { Editor, WelcomePage } from "./pages";

export default function App() {
    return (
        <MaterialCssVarsProvider
            defaultMode="dark"
            theme={{ [MATERIAL_THEME_ID]: materialTheme }}
        >
            <CssVarsProvider
                theme={joyTheme}
                defaultMode="dark"
                modeStorageKey="demo_dark-mode-by-default"
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="editor/:projectid" element={<Editor />} />
                    </Routes>
                    <Toaster
                        toastOptions={{
                            style: {
                                borderRadius: "8px",
                                background: "#333",
                                color: "#fff",
                            },
                        }}
                    />
                </Router>
            </CssVarsProvider>
        </MaterialCssVarsProvider>
    );
}
