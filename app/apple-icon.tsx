import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1915",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 92,
            fontWeight: 800,
            color: "#E3F96A",
            letterSpacing: -3,
          }}
        >
          JD
        </span>
      </div>
    ),
    { ...size },
  );
}
