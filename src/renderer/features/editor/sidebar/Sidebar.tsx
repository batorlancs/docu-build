import React from "react";
import { Drawer, Tooltip } from "@mui/material";
import { Sheet, Tab, TabList, Tabs, type TabProps } from "@mui/joy";

type SidebarProps = {
    items: {
        title: string;
        icon: React.ComponentType<{ className?: string }>;
        component: React.ComponentType;
        props?: Omit<TabProps, "indicatorPlacement" | "sx">;
    }[];
};

const PLACEMENT = "left";

function Sidebar({ items }: SidebarProps) {
    const [index, setIndex] = React.useState(0);

    return (
        <div className="h-full flex ">
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    flexShrink: 0,
                    width: "60px",
                }}
            >
                <Tabs
                    orientation="vertical"
                    value={index}
                    onChange={(event, value) => {
                        setIndex(value as number);
                    }}
                    variant="soft"
                    sx={{
                        height: "100%",
                    }}
                >
                    <TabList underlinePlacement={PLACEMENT}>
                        {items.map((item, itemIndex) => (
                            <Tooltip
                                key={item.title}
                                title={item.title}
                                placement="right"
                                enterDelay={300}
                                arrow
                            >
                                <Tab
                                    indicatorPlacement={PLACEMENT}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "55px",
                                        width: "60px",
                                    }}
                                    {...item.props}
                                >
                                    <item.icon
                                        className={`${
                                            itemIndex === index
                                                ? "opacity-80"
                                                : "opacity-40"
                                        }`}
                                    />
                                </Tab>
                            </Tooltip>
                        ))}
                    </TabList>
                </Tabs>
            </Drawer>
            <div className="h-full w-full">
                {items.map((item, i) => (
                    <Sheet
                        key={item.title}
                        hidden={index !== i}
                        className="h-full bg-neutral-800"
                    >
                        <item.component />
                    </Sheet>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
