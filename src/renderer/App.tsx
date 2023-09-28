import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import {
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider } from "@mui/joy";
import { Toaster } from "react-hot-toast";
import { joyTheme, materialTheme } from "./theme";
import "./App.css";
import { EditorPage, WelcomePage } from "./pages";
import { WindowManager } from "./utils";

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
                    <WindowManager />
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route
                            path="editor/:projectid"
                            element={<EditorPage />}
                        />
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
