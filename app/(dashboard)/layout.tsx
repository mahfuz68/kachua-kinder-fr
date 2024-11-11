/* eslint-disable react/no-children-prop */
/* eslint-disable @next/next/no-img-element */
"use client";

import BottomDashboardNav from "@/components/bottomDashboardNav";
import DashboardNav from "@/components/dashboardNav";
import DashboardSidebar from "@/components/dashboardSidebar";
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const colourTheme = "dark";
    const root = window.document.documentElement;
    root.classList.add(colourTheme);
    setLoading(false);
  }, []);

  // const [isClient, setIsClient] = useState(false);
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  // isClient ?
  const loadingC = <Loading />;

  return (
    // <ThemeProvider attribute="class">
    <div>
      {loading ? (
        loadingC
      ) : (
        <div>
          <div className="w-full">
            <DashboardNav />
            <DashboardSidebar />
          </div>

          <div className="w-full">{children}</div>
          <BottomDashboardNav />
          {/* <BottomNavigation /> */}
        </div>
      )}
    </div>
    // </ThemeProvider>
  );
}
