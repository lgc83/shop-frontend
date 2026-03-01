"use client";

import Image from "next/image";
import {
  Sidebar,
  SidebarBrand,
  SidebarNav,
  SidebarLink,
  SidebarSectionTitle,
  SidebarOverlay,
  SidebarTopRow,
  SidebarCloseButton,
  SidebarLinkLeft,
  SidebarLinkLabel,
} from "@/styled/Admin.styles";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export default function SideBar({ open = false, onClose }: Props) {
  return (
    <>
      <SidebarOverlay $open={open} onClick={onClose} />
      <Sidebar $open={open}>
        <SidebarTopRow>
          <SidebarBrand href="/" onClick={onClose}>
            <Image src="/img/daon-d.png" alt="DAON" width={24} height={24} />
            <span>DAON</span>
          </SidebarBrand>
          <SidebarCloseButton type="button" onClick={onClose} aria-label="사이드바 닫기">
            닫기
          </SidebarCloseButton>
        </SidebarTopRow>

        <SidebarSectionTitle>관리자</SidebarSectionTitle>
        <SidebarNav>
          <li>
            <SidebarLink href="/admin" onClick={onClose}>
              <SidebarLinkLeft>
                <SidebarLinkLabel>대시보드</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
        </SidebarNav>

        <SidebarSectionTitle>상품 관리</SidebarSectionTitle>
        <SidebarNav>
          <li>
            <SidebarLink href="/admin" onClick={onClose}>
              <SidebarLinkLeft>
                <SidebarLinkLabel>상품 목록</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
          <li>
            <SidebarLink href="/admin?create=1" onClick={onClose}>
              <SidebarLinkLeft>
                <SidebarLinkLabel>상품 등록</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
        </SidebarNav>

        <SidebarSectionTitle>주문 관리</SidebarSectionTitle>
        <SidebarNav>
          <li>
            <SidebarLink href="/admin/orders" onClick={onClose}>
              <SidebarLinkLeft>
                <SidebarLinkLabel>주문 목록</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
        </SidebarNav>

        <SidebarSectionTitle>관리 바로가기</SidebarSectionTitle>
        <SidebarNav>
          <li>
            <SidebarLink href="/consumer" onClick={onClose}>
              <SidebarLinkLeft>
                <SidebarLinkLabel>메인(소비자) 화면</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
          <li>
            <SidebarLink href="/orders" onClick={onClose}>
              <SidebarLinkLeft>
                <SidebarLinkLabel>주문 채널 바로가기</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
        </SidebarNav>
      </Sidebar>
    </>
  );
}