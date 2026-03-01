import styled from "styled-components";
import { Container, Card, Button } from "react-bootstrap";

/* 전체 컨테이너 - 고정 헤더 대응 */
export const PageContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  padding-top: 88px;
  background: radial-gradient(1200px 600px at 20% 10%, #eef2ff 0%, rgba(238, 242, 255, 0) 55%),
    radial-gradient(900px 500px at 80% 20%, #e0f2fe 0%, rgba(224, 242, 254, 0) 55%),
    #f8f9fc;
`;

/* 카드 */
export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 520px;
  border: none;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
`;

/* 폼 영역 */
export const FormWrapper = styled.div`
  padding: 40px 36px;
`;

/* 폼 제목 */
export const FormTitle = styled.h1`
  font-size: 1.35rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 28px;
  color: #0f172a;
  letter-spacing: -0.02em;
`;

/* 폼 라벨 */
export const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`;

/* 주소검색 영역 */
export const AddressGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

/* 주소 검색 버튼 - B2B 스타일 진한 파란색 */
export const AddressButton = styled.button`
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  background-color: #1e3a5f;
  border: none;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2d4a6f;
  }
`;

/* 회원가입 버튼 - 로그인 버튼과 통일 */
export const SubmitButton = styled(Button)`
  width: 100%;
  padding: 0.85rem;
  border-radius: 6px;
  border: none;
  background: #1f2937;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #374151;
    color: #fff;
  }

  &:active {
    transform: translateY(1px);
  }
`;

/* 하단 링크 - 로그인 화면과 통일 */
export const FooterLinks = styled.div`
  margin-top: 24px;
  text-align: center;
  font-size: 0.875rem;

  a {
    color: #6b7280;
    text-decoration: none;
  }
  a:hover {
    color: #374151;
    text-decoration: underline;
  }
`;
