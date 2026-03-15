import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Card } from "@mui/material";

export type TabsItem = {
  label: string;
  content: React.ReactNode;
};

type TabsSwitcherProps = {
  items: TabsItem[];
  initialTab?: number;
};

export default function TabsSwitcher({
  items,
  initialTab = 0,
}: TabsSwitcherProps) {
  const [value, setValue] = useState(initialTab);

  return (
    <Box className="w-full h-full flex flex-col min-h-0">

      <Box className="border-b border-gray-300 bg-gray-100">
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          variant="fullWidth"
        >
          {items.map((item, index) => (
            <Tab key={index} label={item.label} />
          ))}
        </Tabs>
      </Box>

      <Card elevation={0} className="flex-1 min-h-0">
        <Box className="overflow-hidden">{items[value]?.content}</Box>
      </Card>
    </Box>
  );
}
