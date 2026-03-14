import TabsSwitcher from "../components/TabsSwitcher";
import Graph from "../components/Graph";

export default function DashboardPage() {
  return (
    <TabsSwitcher
      items={[
        {
          label: "Portfolio",
          content: <div>TODO</div>,
        },
        {
          label: "Dependencies",
          content: <Graph />,
        },
      ]}
    />
  );
}
