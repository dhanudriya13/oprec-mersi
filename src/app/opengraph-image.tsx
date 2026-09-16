import { ImageResponse } from "next/og";
import { seo, site } from "@/data/site";

export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded social share card, generated at build time from the same tokens as
 * the site , so it never goes stale and costs no extra asset to maintain.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #fefcf5 0%, #f9edcd 48%, #eeda9c 100%)",
          padding: "72px",
          color: "#1a1608",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "22px",
              background: "#e5c363",
              color: "#1f1804",
              fontSize: "40px",
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "22px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#6a6350",
            }}
          >
            {site.fullName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "96px",
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 1.05,
            }}
          >
            Create. Communicate.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "96px",
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 1.05,
              color: "#8a6a11",
            }}
          >
            Represent.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "26px",
            color: "#6a6350",
          }}
        >
          <div style={{ display: "flex" }}>
            Student PR Team , Information Systems Study Programme
          </div>
          <div style={{ display: "flex", fontWeight: 700, color: "#8a6a11" }}>
            Open Recruitment
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
