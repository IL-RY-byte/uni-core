"use client";

import SidebarItem, { SidebarItemProps } from "./SidebarItem";

interface SidebarSectionProps {
  title: string;
  items: SidebarItemProps[];
}

export default function SidebarSection({ title, items }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
