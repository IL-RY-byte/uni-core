"use client";

import type { IconProps } from "@tabler/icons-react";
import type { ReactNode } from "react";

export interface SidebarItemProps {
  icon: React.FC<IconProps>;
  title: string;
  callback: () => void;
  active?: boolean;
}

export default function SidebarItem({
  icon: Icon,
  title,
  callback,
  active,
}: SidebarItemProps) {
  return (
    <div
      onClick={callback}
      className={`
        flex items-center space-x-3 p-2 rounded-lg cursor-pointer text-sm font-medium transition-colors
        ${active ? "bg-white text-black" : "text-white hover:bg-gray-800"}
      `}
    >
      <Icon size={20} />
      <span>{title}</span>
    </div>
  );
}
