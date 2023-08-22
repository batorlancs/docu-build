import React from "react";
import { TabList, Tabs, Tab, TabPanel, Typography } from "@mui/joy";
import {
    Cog8ToothIcon,
    CodeBracketSquareIcon,
} from "@heroicons/react/24/outline";
import { Preferences, Project } from "renderer/features/welcomePage";

function CustomTab({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <Tab variant="plain" color="neutral" indicatorPlacement="left">
            <div className="flex items-center justify-between gap-4 pr-12">
                <div className="h-6 w-6">{icon}</div>
                <Typography>{label}</Typography>
            </div>
        </Tab>
    );
}

function CustomTabPanel({
    children,
    value,
}: {
    children: React.ReactNode;
    value: number;
}) {
    return (
        <TabPanel className="overflow-y-auto" value={value}>
            {children}
        </TabPanel>
    );
}

function WelcomePage() {
    return (
        <div className="h-screen bg-black">
            <Tabs
                className="h-full"
                orientation="vertical"
                size="lg"
                sx={{
                    boxShadow: "sm",
                    overflow: "auto",
                }}
            >
                <TabList
                    sx={{
                        backgroundColor: "neutral.800",
                    }}
                >
                    <div className="py-6 pl-6">docu-build</div>
                    <CustomTab
                        icon={<CodeBracketSquareIcon />}
                        label="Projects"
                    />
                    <CustomTab icon={<Cog8ToothIcon />} label="Preferences" />
                </TabList>
                <CustomTabPanel value={0}>
                    <Project />
                </CustomTabPanel>
                <CustomTabPanel value={1}>
                    <Preferences />
                </CustomTabPanel>
            </Tabs>
        </div>
    );
}

export default WelcomePage;
