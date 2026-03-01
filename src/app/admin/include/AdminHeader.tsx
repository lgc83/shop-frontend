"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { AdminHeaderBar, AdminHeaderBrand, AdminHeaderActions } from "@/styled/Admin.styles";

type Props = {
  isLogin: boolean | null;
  setIsLogin: (v: boolean) => void;
  onToggleSidebar?: () => void;
};

export default function AdminHeader({ isLogin, setIsLogin, onToggleSidebar }: Props) {
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLogin(false);
    } catch (err) {
      console.error("logout error:", err);
    }
  };

  return (
    <AdminHeaderBar>
      <button
        type="button"
        className="admin-header__burger"
        onClick={onToggleSidebar}
        aria-label="사이드바 열기/닫기"
      >
        <span className="burger-bar" />
        <span className="burger-bar" />
        <span className="burger-bar" />
      </button>

      <AdminHeaderBrand href="/">
        <Image src="/img/daon-d.png" alt="DAON" width={24} height={24} />
        <span>DAON</span>
      </AdminHeaderBrand>

      <AdminHeaderActions>
        {isLogin ? (
          <Button variant="outline-dark" size="sm" onClick={logout}>
            로그아웃
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="dark" size="sm">
              로그인
            </Button>
          </Link>
        )}
      </AdminHeaderActions>
    </AdminHeaderBar>
  );
}
