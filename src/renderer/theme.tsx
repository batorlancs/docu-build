import { extendTheme as joyExtendTheme } from "@mui/joy/styles";
import {
    experimental_extendTheme as materialExtendTheme,
    type ThemeOptions as MuiThemeOptions,
} from "@mui/material/styles";

const joyThemeOptions = {
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    "50": "#eef2ff",
                    "100": "#e0e7ff",
                    "200": "#c7d2fe",
                    "300": "#a5b4fc",
                    "400": "#818cf8",
                    "500": "#6366f1",
                    "600": "#4f46e5",
                    "700": "#4338ca",
                    "800": "#3730a3",
                    "900": "#312e81",
                },
                neutral: {
                    "50": "#fafafa",
                    "100": "#f4f4f5",
                    "200": "#e4e4e7",
                    "300": "#d4d4d8",
                    "400": "#a1a1aa",
                    "500": "#71717a",
                    "600": "#52525b",
                    "700": "#3f3f46",
                    "800": "#27272a",
                    "900": "#18181b",
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    "50": "#eef2ff",
                    "100": "#e0e7ff",
                    "200": "#c7d2fe",
                    "300": "#a5b4fc",
                    "400": "#818cf8",
                    "500": "#6366f1",
                    "600": "#4f46e5",
                    "700": "#4338ca",
                    "800": "#3730a3",
                    "900": "#312e81",
                },
                neutral: {
                    "50": "#fafafa",
                    "100": "#f4f4f5",
                    "200": "#e4e4e7",
                    "300": "#d4d4d8",
                    "400": "#a1a1aa",
                    "500": "#71717a",
                    "600": "#52525b",
                    "700": "#3f3f46",
                    "800": "#27272a",
                    "900": "#18181b",
                },
            },
        },
    },
};

const muiThemeOptions: MuiThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: "#818cf8",
        },
        secondary: {
            main: "#85d8e2",
        },
    },
    typography: {
        fontFamily: "Inter",
    },
};

const joyTheme = joyExtendTheme(joyThemeOptions);
const materialTheme = materialExtendTheme(muiThemeOptions);

export { joyTheme, materialTheme };
