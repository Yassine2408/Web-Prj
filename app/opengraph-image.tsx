import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sitara - Sites web performants au Maroc";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d2a7a 0%, #1fa7dc 50%, #8b3ff2 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          Sitara
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: 30,
          }}
        >
          Sites web performants au Maroc
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.82)",
            marginBottom: 40,
          }}
        >
          WhatsApp • SEO Local • Conversion-first
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "white",
            background: "rgba(255, 255, 255, 0.2)",
            padding: "15px 40px",
            borderRadius: 30,
          }}
        >
          sitara.ma
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
