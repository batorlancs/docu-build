import { useDocs } from "renderer/context";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
// import { gruvboxDark } from "@uiw/codemirror-themes-all";
import * as prettier from "prettier";
import markdownparser from "prettier/parser-markdown";
import React, { useEffect } from "react";

function CodeEditor() {
    const { currentDoc } = useDocs();
    const [editorContent, setEditorContent] = React.useState<string>("");

    const changeEditorContent = (content: string) => {
        setEditorContent(() => {
            try {
                return prettier.format(content, {
                    parser: "markdown",
                    tabWidth: 4,
                    plugins: [markdownparser],
                });
            } catch (err) {
                return content;
            }
        });
    };

    useEffect(() => {
        if (currentDoc) {
            changeEditorContent(currentDoc.content);
        }
    }, [currentDoc]);

    return (
        <div className="h-full pb-[50px]">
            <CodeMirror
                value={editorContent}
                theme="dark"
                extensions={[langs.markdown()]}
                className="h-full overflow-y-auto"
                height="100%"
                basicSetup={{
                    tabSize: 4,
                    foldGutter: false,
                }}
                onChange={(value) => {
                    changeEditorContent(value);
                }}
            />
        </div>
    );
}

export default CodeEditor;
