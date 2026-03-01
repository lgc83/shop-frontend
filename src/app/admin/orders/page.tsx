"use client";

import { useState } from "react";
import AdminHeader from "../include/AdminHeader";
import { PageWrapper, MainContentWrapper, Content, H1 } from "@/styled/Admin.styles";
import SideBar from "../include/SideBar";

export default function AdminOrdersPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PageWrapper>
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MainContentWrapper>
        <AdminHeader
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <Content>
          <H1>주문 목록</H1>
          <p className="text-muted mt-2">주문 관리 기능이 준비 중입니다.</p>
        </Content>
      </MainContentWrapper>
    </PageWrapper>
  );
}
