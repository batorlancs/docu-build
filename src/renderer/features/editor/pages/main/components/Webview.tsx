import { useDragging } from "renderer/context/dragging";

function Webview() {
    const { dragging } = useDragging();

    return (
        <>
            <div
                className="bg-white bg-opacity-5 rounded-md"
                style={{
                    height: dragging === "code-web" ? "100%" : "0",
                    width: dragging === "code-web" ? "100%" : "0",
                }}
            />
            <webview
                id="webview-main"
                src="https://docusaurus.io/docs/sidebar/multiple-sidebars"
                style={{
                    height: dragging === "code-web" ? "0" : "100%",
                    width: dragging === "code-web" ? "0" : "100%",
                }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />
        </>
    );
}

export default Webview;
