import { useState } from "react";

function useShow() {
    const [show, setShow] = useState<boolean>(false);

    const toggleShow = () => {
        setShow((prev) => !prev);
    };

    return { show, toggleShow, setShow };
}

export default useShow;
