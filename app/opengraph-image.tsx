import { ImageResponse } from "next/og";

export const alt = "Jeremy Dai — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 48,
          background: "#1A1915",
          gap: 24,
        }}
      >
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#FCF6EA",
            color: "#1A1915",
            borderRadius: 36,
            padding: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#1A1915",
              color: "#E3F96A",
              borderRadius: 999,
              padding: "8px 20px",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Google · GenAI FDE
          </div>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.02 }}>
            Jeremy Dai
          </div>
          <div style={{ fontSize: 26, color: "rgba(26, 25, 21, 0.72)" }}>
            Building Agent and RAG systems in production.
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#E3F96A",
            color: "#1A1915",
            borderRadius: 36,
            padding: 40,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600 }}>fufu.dev</div>
          <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2 }}>
            Writing &amp; projects on what breaks in prod.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
