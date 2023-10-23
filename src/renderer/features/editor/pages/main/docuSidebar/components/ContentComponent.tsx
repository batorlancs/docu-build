import React from "react";
import {
    useTreeItem,
    TreeItem,
    type TreeItemContentProps,
    type TreeItemProps,
} from "@mui/x-tree-view";
import { Typography } from "@mui/joy";
import clsx from "clsx";

const CustomContent = React.forwardRef(function CustomContent(
    props: TreeItemContentProps,
    ref
) {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
    } = props;

    const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        handleSelection,
        preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        preventSelection(event);
    };

    const handleExpansionClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        handleExpansion(event);
    };

    const handleSelectionClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        handleSelection(event);
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={clsx(className, classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.focused]: focused,
                [classes.disabled]: disabled,
            })}
            onMouseDown={handleMouseDown}
            ref={ref as React.Ref<HTMLDivElement>}
            style={{
                height: "30px",
                borderRadius: "4px",
                marginBottom: "6px",
            }}
        >
            <Typography
                onClick={handleSelectionClick}
                component="div"
                className={classes.label}
                noWrap
            >
                {label}
            </Typography>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                onClick={handleExpansionClick}
                className={classes.iconContainer}
            >
                {icon}
            </div>
        </div>
    );
});

export const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: TreeItemProps,
    ref: React.Ref<HTMLLIElement>
) {
    return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});
