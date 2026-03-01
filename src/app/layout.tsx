import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Footer from "@/include/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body style={{ overflow: "visible" }}>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "visible" }}>
          <main style={{ flex: 1, overflow: "visible" }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
