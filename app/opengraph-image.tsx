import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>Jeremy Dai</div>
        <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 16 }}>
          AI Engineer · RAG · Agent Systems
        </div>
        <div style={{ fontSize: 20, color: "#71717a", marginTop: 12 }}>
          fufu.dev
        </div>
      </div>
    ),
    size,
  );
}
