"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/include/Footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add("admin-page");
    } else {
      document.body.classList.remove("admin-page");
    }
    return () => document.body.classList.remove("admin-page");
  }, [isAdmin]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "visible" }}>
      <main style={{ flex: 1, overflow: "visible" }}>{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
}
