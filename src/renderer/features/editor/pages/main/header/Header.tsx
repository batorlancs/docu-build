import { Sheet } from "@mui/joy";
import { IconButton } from "renderer/components/buttons";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Header() {
    const nav = useNavigate();

    return (
        <Sheet className="h-12 flex items-center justify-between px-4">
            <div>
                <button
                    type="button"
                    onClick={() => {
                        nav("/");
                    }}
                >
                    go home
                </button>
            </div>
            <div>
                <IconButton>
                    <PlayIcon className="h-6 w-6" />
                </IconButton>
            </div>
        </Sheet>
    );
}

export default Header;
