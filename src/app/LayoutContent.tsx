"use client";

import { usePathname } from "next/navigation";
import Footer from "@/include/Footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "visible" }}>
      <main style={{ flex: 1, overflow: "visible" }}>{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
}
