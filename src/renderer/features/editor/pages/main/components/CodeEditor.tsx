import { WebviewTag } from "electron";
import { useDocs } from "renderer/context";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";

function CodeEditor() {
    const webview = document.getElementById("webview-main") as
        | WebviewTag
        | undefined;

    const { currentDoc } = useDocs();

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
            {/* <p>{currentDoc?.content}</p> */}
            <CodeMirror
                value={currentDoc?.content}
                theme="dark"
                extensions={[langs.markdown()]}
            />
        </div>
    );
}

export default CodeEditor;
