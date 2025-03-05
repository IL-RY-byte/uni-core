"use client";

import Header from "@/components/Dashboard/Header/Header";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { SessionProvider } from "@/context/SessionContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <main className="grid grid-cols-[16rem,_1fr] min-h-screen">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </SessionProvider>
  );
}
