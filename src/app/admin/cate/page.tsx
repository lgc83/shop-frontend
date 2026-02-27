"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/include/Header";

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

/** localStorage helpers */
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
          {/* ✅ 카테고리 관리 섹션 */}
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
              // 카테고리도 함께 최신화(상품 저장 시 카테고리 변경 가능성)
              fetchCategories();
            }}
            productId={currentProductId}
            mode={modalMode}
            isLogin={isLogin ?? false}
          />
        </MainContentWrapper>
      </PageWrapper>
    </>
  );
}
