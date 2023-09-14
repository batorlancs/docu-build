/* eslint import/prefer-default-export: off */
import { URL } from "url";
import path from "path";
import { exec } from "child_process";
import { app } from "electron";

export function resolveHtmlPath(htmlFileName: string) {
    if (process.env.NODE_ENV === "development") {
        const port = process.env.PORT || 1212;
        const url = new URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
}

export async function execute(
    command: string,
    commandPath?: string
): Promise<string> {
    const executePath: string = commandPath || app.getAppPath();
    return new Promise((resolve, reject) => {
        exec(command, { cwd: executePath }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            if (stdout) {
                resolve(stdout);
            }
            resolve("");
        });
    });
}

export function generateColor() {
    // Generate random values for R, G, and B components
    const r = Math.floor(Math.random() * 256); // Random red value between 0 and 255
    const g = Math.floor(Math.random() * 256); // Random green value between 0 and 255
    const b = Math.floor(Math.random() * 256); // Random blue value between 0 and 255

    // Convert the decimal values to hexadecimal and pad with zeros if necessary
    const rHex = r.toString(16).padStart(2, "0");
    const gHex = g.toString(16).padStart(2, "0");
    const bHex = b.toString(16).padStart(2, "0");

    // Concatenate the hexadecimal values to form a valid hex color code
    const hexColor = `#${rHex}${gHex}${bHex}`;

    return hexColor;
}

export function getTextColorForBackground(backgroundColor: string): string {
    // Convert the background color to RGB
    const rgb = parseInt(backgroundColor.slice(1), 16);

    // Extract the individual RGB components
    const rgbStr = rgb.toString(16).padStart(6, "0"); // Convert to hex string and pad with leading zeros if necessary

    const r = parseInt(rgbStr.slice(0, 2), 16); // Parse the first two characters as red component
    const g = parseInt(rgbStr.slice(2, 4), 16); // Parse the next two characters as green component
    const b = parseInt(rgbStr.slice(4, 6), 16); // Parse the last two characters as blue component

    // Calculate the relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose text color based on contrast ratio
    if (luminance > 0.5) {
        return "#000000"; // Use black for light backgrounds
    }
    return "#ffffff"; // Use white for dark backgrounds
}

export function generatePrefixFromName(name: string): string {
    // use first two letters of name
    return name.slice(0, 2).toUpperCase();
}
