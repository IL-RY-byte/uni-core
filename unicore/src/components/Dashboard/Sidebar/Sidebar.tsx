"use client";

import { useState, useContext } from "react";
import SidebarSection from "./SidebarSection";
import {
  IconBell,
  IconBook,
  IconBuilding,
  IconLayoutDashboard,
  IconLogout,
  IconMap,
  IconUsers,
  IconProps,
} from "@tabler/icons-react";
import { SessionContext } from "@/context/SessionContext";

interface MenuItem {
  name: string;
  icon: React.FC<IconProps>;
  section: string;
}

interface AccountItem {
  name: string;
  icon: React.FC<IconProps>;
  callback: () => void;
}

const Sidebar = () => {
  const [selected, setSelected] = useState("Catalog");
  const { logout } = useContext(SessionContext);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: IconLayoutDashboard, section: "Quick access" },
    { name: "Operations", icon: IconBook, section: "Services" },
    { name: "Users", icon: IconUsers, section: "Services" },
    { name: "Branches", icon: IconBuilding, section: "Services" },
    { name: "Map", icon: IconMap, section: "Services" },
  ];

  const accountItems: AccountItem[] = [
    { name: "Log Out", icon: IconLogout, callback: logout },
    { name: "Notifications", icon: IconBell, callback: () => {} },
  ];

  const groupedMenuItems = menuItems.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      (acc[item.section] ||= []).push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="bg-black text-white sticky top-4 h-screen w-64 p-4 flex flex-col">
      <div className="flex justify-center my-12">
        <h1 className="text-xl font-light text-center">UNICORE</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-auto">
        {Object.entries(groupedMenuItems).map(([section, items]) => (
          <SidebarSection
            key={section}
            title={section}
            items={items.map((item) => ({
              title: item.name,
              icon: item.icon,
              callback: () => setSelected(item.name),
              active: selected === item.name,
            }))}
          />
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <SidebarSection
          title="Account"
          items={accountItems.map((item) => ({
            title: item.name,
            icon: item.icon,
            callback: item.callback,
            active: false,
          }))}
        />
      </div>
    </div>
  );
};

export default Sidebar;
