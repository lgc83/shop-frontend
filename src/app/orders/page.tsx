"use client";

import { useEffect, useMemo, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Header from "@/include/Header";
import { useRouter } from "next/navigation";

const API_BASE = `/api`;

declare global {
  interface Window {
    daum: any;
  }
}

type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl?: string | null;
  qty: number;
};

type OrderDetails = {
  address: string;
  detailAddress: string;
  paymentMethod: "kakao" | "card";
};

type Delivery = {
  deliveryId: string;
  createdAt: string;
  status: "READY" | "SHIPPING" | "DONE";
  address: string;
  paymentMethod: "kakao" | "card";
  totalPrice: number;
  items: CartItem[];
};

export default function OrderPage() {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    address: "",
    detailAddress: "",
    paymentMethod: "card",
  });

  // =========================
  // 이미지 경로 보정
  // =========================
  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      setCart([]);
      return;
    }
    try {
      const parsed = JSON.parse(savedCart);
      const normalized: CartItem[] = (Array.isArray(parsed) ? parsed : []).map((item: any) => ({
        id: Number(item.id),
        title: String(item.title ?? ""),
        price: Number(item.price ?? 0),
        imageUrl: item.imageUrl ?? null,
        qty: Math.max(1, Number(item.qty ?? 1)),
      }));
      setCart(normalized);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // =========================
  // 로그인 체크 (/auth/me)
  // =========================
  useEffect(() => {
    const url = new URL(window.location.href);
    const pm = url.searchParams.get("pm");
    if (pm === "kakao" || pm === "card") {
      setOrderDetails((prev) => ({ ...prev, paymentMethod: pm }));
    }
  }, []);

  // =========================
  // 총 금액
  // =========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "paymentMethod") {
      const v = value === "kakao" ? "kakao" : "card";
      setOrderDetails((prev) => ({ ...prev, paymentMethod: v }));
      return;
    }

    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  // =========================
  // 다음 주소 API
  // =========================
      <Container className="py-4">
        <h1>주문 정보</h1>

        {cart.map((item) => (
          <div key={item.id} className="border p-3 mb-3 d-flex gap-3">
            <img
              src={resolveImageSrc(item.imageUrl)}
              alt={item.title}
              style={{ width: 80, height: 80, objectFit: "cover" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/no-image.png";
              }}
            />
            <div>
              <div>{item.title}</div>
              <div>
                {item.price.toLocaleString()}원 x {item.qty}
              </div>
            </div>
          </div>
        ))}

        <h4 className="text-end">총 금액: {totalPrice.toLocaleString()}원</h4>

        <Form>
          <Form.Group className="mt-3">
            <Form.Label>주소</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control readOnly value={orderDetails.address} />
              <Button type="button" onClick={handleAddressSearch}>
                주소검색
              </Button>
            </div>
          </Form.Group>

          <Form.Control
            className="mt-2"
            placeholder="상세주소"
            name="detailAddress"
            value={orderDetails.detailAddress}
            onChange={(e) => handleChange(e as any)}
          />

          <Form.Select
            className="mt-3"
            name="paymentMethod"
            value={orderDetails.paymentMethod}
            onChange={(e) => handleChange(e as any)}
          >
            <option value="card">신용카드</option>
            <option value="kakao">카카오페이</option>
          </Form.Select>

          <Button className="mt-4" type="button" onClick={handlePlaceOrder}>
            주문하기
          </Button>
        </Form>
      </Container>
    </>
  );
}
