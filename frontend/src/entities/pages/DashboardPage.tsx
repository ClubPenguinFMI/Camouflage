import TabsSwitcher from "../components/TabsSwitcher";
import GraphTab from "../components/GraphTab";
import ChartTab from "../components/ChartTab";

export default function DashboardPage() {
  return (
    <TabsSwitcher
      items={[
        {
          label: "Portfolio",
          content: <ChartTab />,
        },
        {
          label: "Dependencies",
          content: <GraphTab />,
        },
      ]}
    />
  );
}
