import { useDragging } from "renderer/context/dragging";

function Webview() {
    const { dragging } = useDragging();

    return (
        <>
            {/* <div
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    backgroundColor: "black",
                    width: "100%",
                    height: "100%",
                    // background: "transparent",
                    pointerEvents: "none",
                    zIndex: 50,
                }}
            /> */}
            <webview
                src="https://docusaurus.io/docs/sidebar/multiple-sidebars"
                style={{
                    height: dragging === "code-web" ? "0" : "100%",
                    width:
                        dragging === "code-web" ? "calc(100% - 4px)" : "100%",
                    zIndex: 40,
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
