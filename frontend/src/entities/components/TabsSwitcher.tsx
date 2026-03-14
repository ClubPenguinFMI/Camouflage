import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

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
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        variant="fullWidth"
      >
        {items.map((item, index) => (
          <Tab key={index} label={item.label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>{items[value]?.content}</Box>
    </Box>
  );
}
