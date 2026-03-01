"use client";

import { useState } from "react";
import Header from "@/include/Header";
import { PageWrapper, MainContentWrapper, Content, H1 } from "@/styled/Admin.styles";
import SideBar from "../include/SideBar";

export default function AdminOrdersPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <PageWrapper>
      <SideBar />
      <MainContentWrapper>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} onOpenModal={() => {}} />
        <Content>
          <H1>주문 목록</H1>
          <p className="text-muted mt-2">주문 관리 기능이 준비 중입니다.</p>
        </Content>
      </MainContentWrapper>
    </PageWrapper>
  );
}
