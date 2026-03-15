import TabsSwitcher from "../components/TabsSwitcher";
import GraphTab from "../components/GraphTab";
import ChartTab from "../components/ChartTab";
import type { Portfolio } from "../../sdk/interfaces";

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
