import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

type ShowConditionallyProps = {
    show: boolean;
    children: React.ReactNode;
    variant?: Variants;
    initial?: boolean;
    className?: string;
};

const DEFAULT_VARIANTS = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

function ShowConditionally({
    show,
    children,
    variant,
    initial,
    className,
}: ShowConditionallyProps) {
    return (
        <AnimatePresence initial={initial}>
            {show && (
                <motion.div variants={variant} className={className}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

ShowConditionally.defaultProps = {
    variant: DEFAULT_VARIANTS,
    initial: false,
    className: "",
};

export default ShowConditionally;
