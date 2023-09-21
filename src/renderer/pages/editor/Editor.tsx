import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function Editor() {
    const { projectid } = useParams<{ projectid: string }>();
    const navigate = useNavigate();
    return (
        <div>
            <p>{projectid}</p>
            <button
                type="button"
                onClick={() => {
                    navigate("/");
                }}
            >
                go home
            </button>
        </div>
    );
}

export default Editor;
