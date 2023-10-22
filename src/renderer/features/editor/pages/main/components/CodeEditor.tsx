import { WebviewTag } from "electron";

function CodeEditor() {
    const webview = document.getElementById("webview-main") as
        | WebviewTag
        | undefined;

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    webview?.loadURL("https://google.com");
                }}
            >
                open google
            </button>
        </div>
    );
}

export default CodeEditor;
