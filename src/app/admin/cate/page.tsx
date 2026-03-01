"use client";

import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import AdminHeader from "../include/AdminHeader";
import ProductModal from "@/modal/ProductModal";
import {
  PageWrapper,
  MainContentWrapper,
  Content,
  ContentInner,
  H1,
  H5,
  P,
} from "@/styled/Admin.styles";
import SideBar from "../include/SideBar";

type Product = {
  id: number;
  title: string;
  desc: string;
  price: number;
  primaryCategory?: number;
  secondaryCategory?: number;
  imageUrl?: string;
};

type CategoryNode = {
  id: number;
  name: string;
  children?: CategoryNode[];
};

const LS_KEY = "categories";

const loadCategoriesLS = (): CategoryNode[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const saveCategoriesLS = (cats: CategoryNode[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(cats));
};

const nextIdFrom = (cats: CategoryNode[]) => {
  let max = 0;
  for (const p of cats) {
    max = Math.max(max, p.id);
    for (const c of p.children ?? []) {
      max = Math.max(max, c.id);
    }
  }
  return max + 1;
};

export default function Category() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryNode[]>([]);
  const [primaryName, setPrimaryName] = useState("");
  const [secondaryName, setSecondaryName] = useState("");
  const [selectedPrimaryId, setSelectedPrimaryId] = useState<number | "">("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [currentProductId, setCurrentProductId] = useState<number | undefined>(undefined);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchCategories = () => {
    setCategoryList(loadCategoriesLS());
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("상품 로딩 실패", err);
    }
  };

  const createPrimary = () => {
    const name = primaryName.trim();
    if (!name) return;
    const cats = loadCategoriesLS();
    const nextId = nextIdFrom(cats);
    cats.push({ id: nextId, name, children: [] });
    saveCategoriesLS(cats);
    setCategoryList(cats);
    setPrimaryName("");
  };

  const createSecondary = () => {
    const name = secondaryName.trim();
    if (!name || selectedPrimaryId === "") return;
    const cats = loadCategoriesLS();
    const parent = cats.find((c) => c.id === selectedPrimaryId);
    if (!parent) return;
    const nextId = nextIdFrom(cats);
    const children = parent.children ?? [];
    children.push({ id: nextId, name });
    parent.children = children;
    saveCategoriesLS(cats);
    setCategoryList(cats);
    setSecondaryName("");
  };

  const deletePrimary = (id: number) => {
    if (!confirm("1차 카테고리와 하위 2차 카테고리를 모두 삭제할까요?")) return;
    const cats = loadCategoriesLS().filter((c) => c.id !== id);
    saveCategoriesLS(cats);
    setCategoryList(cats);
    if (selectedPrimaryId === id) setSelectedPrimaryId("");
  };

  const deleteSecondary = (primaryId: number, secondaryId: number) => {
    const cats = loadCategoriesLS();
    const parent = cats.find((c) => c.id === primaryId);
    if (!parent) return;
    parent.children = (parent.children ?? []).filter((c) => c.id !== secondaryId);
    saveCategoriesLS(cats);
    setCategoryList(cats);
  };

  const openModal = (mode: "create" | "edit" | "view", productId?: number) => {
    setModalMode(mode);
    setCurrentProductId(productId);
    setShowModal(true);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <>
      <PageWrapper>
        <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainContentWrapper>
          <AdminHeader
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
          />

          <Content>
            <H1>카테고리 관리</H1>

            <ContentInner style={{ display: "grid", gap: 12 }}>
              {/* 1차 등록 */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <H5 style={{ margin: 0 }}>1차 카테고리 등록</H5>
                <Form.Control
                  style={{ maxWidth: 320 }}
                  value={primaryName}
                  onChange={(e) => setPrimaryName(e.target.value)}
                  placeholder="예: 의류, 잡화, 생활용품..."
                />
                <Button variant="primary" onClick={createPrimary}>
                  1차 추가
                </Button>
                <Button variant="outline-secondary" onClick={fetchCategories}>
                  새로고침
                </Button>
              </div>

              {/* 2차 등록 */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <H5 style={{ margin: 0 }}>2차 카테고리 등록</H5>
                <Form.Select
                  style={{ maxWidth: 260 }}
                  value={selectedPrimaryId}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSelectedPrimaryId(v === "" ? "" : Number(v));
                  }}
                >
                  <option value="">부모(1차) 선택</option>
                  {categoryList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control
                  style={{ maxWidth: 320 }}
                  value={secondaryName}
                  onChange={(e) => setSecondaryName(e.target.value)}
                  placeholder="예: 티셔츠, 셔츠, 바지..."
                />

                <Button variant="success" onClick={createSecondary}>
                  2차 추가
                </Button>
              </div>

              {/* 카테고리 목록/삭제 */}
              <div style={{ display: "grid", gap: 10 }}>
                {categoryList.length === 0 ? (
                  <P>등록된 카테고리가 없습니다. 위에서 1차/2차를 추가하세요.</P>
                ) : (
                  categoryList.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 10,
                        padding: 12,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <H5 style={{ margin: 0 }}>{p.name}</H5>
                        <P style={{ margin: 0, opacity: 0.7 }}>({p.id})</P>

                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => setSelectedPrimaryId(p.id)}
                          >
                            2차 추가 대상 선택
                          </Button>
                          <Button size="sm" variant="outline-danger" onClick={() => deletePrimary(p.id)}>
                            1차 삭제
                          </Button>
                        </div>
                      </div>

                      <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {(p.children ?? []).length === 0 ? (
                          <P style={{ margin: 0 }}>2차 카테고리가 없습니다.</P>
                        ) : (
                          (p.children ?? []).map((c) => (
                            <div
                              key={c.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "6px 10px",
                                border: "1px solid rgba(0,0,0,0.08)",
                                borderRadius: 999,
                              }}
                            >
                              <span style={{ fontSize: 14 }}>{c.name}</span>
                              <span style={{ fontSize: 12, opacity: 0.6 }}>({c.id})</span>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => deleteSecondary(p.id, c.id)}
                                style={{ padding: "2px 8px" }}
                              >
                                삭제
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ContentInner>
          </Content>

          <ProductModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSaved={() => {
              setShowModal(false);
              fetchProducts();
              fetchCategories();
            }}
            productId={currentProductId}
            mode={modalMode}
            isLogin={isLogin}
            categoryList={categoryList}
          />
        </MainContentWrapper>
      </PageWrapper>
    </>
  );
}
