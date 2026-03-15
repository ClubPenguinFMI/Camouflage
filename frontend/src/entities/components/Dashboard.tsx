import TabsSwitcher from "../components/TabsSwitcher";
import GraphTab from "../components/GraphTab";
import ChartTab from "../components/ChartTab";
import { useEffect, useState } from "react";
import type { Credentials, Portfolio } from "../../sdk/interfaces";
import { assets as assetsSdk } from "../../sdk";

export default function Dashboard({ assets }: { assets: Portfolio[] }) {


    return (
        <TabsSwitcher
            items={[
                {
                    label: "Portfolio",
                    content: <ChartTab assets={assets} />,
                },
                {
                    label: "Dependencies",
                    content: <GraphTab assets={assets} />,
                },
            ]}
        />
    );
}
