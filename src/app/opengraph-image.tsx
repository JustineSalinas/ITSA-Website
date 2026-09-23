import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.fullName} | ${siteConfig.school}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(52, 169, 224, 0.3) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(247, 168, 30, 0.22) 0%, transparent 50%)",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(52, 169, 224, 0.15)",
              border: "1px solid rgba(52, 169, 224, 0.4)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#34a9e0",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#7dd3fc",
              }}
            >
              USA ILOILO • DEPT OF IT
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#94a3b8",
              fontSize: "18px",
              fontFamily: "monospace",
            }}
          >
            <span>itsa-usa.org</span>
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontSize: "76px",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                lineHeight: 1.05,
              }}
            >
              ITSA
            </span>
            <span
              style={{
                fontSize: "32px",
                fontWeight: 600,
                color: "#f7a81e",
                padding: "6px 14px",
                backgroundColor: "rgba(247, 168, 30, 0.12)",
                borderRadius: "8px",
                border: "1px solid rgba(247, 168, 30, 0.3)",
              }}
            >
              EST. 2004
            </span>
          </div>

          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#e2e8f0",
              lineHeight: 1.25,
            }}
          >
            Information Technology Student Association
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              maxWidth: "960px",
              lineHeight: 1.45,
            }}
          >
            Building the next generation of software engineers, cybersecurity defenders, and tech leaders at the University of San Agustin.
          </div>
        </div>

        {/* Footer Features */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
            }}
          >
            {["Community", "Hackathons", "Tech Workshops", "Project Showcases"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#cbd5e1",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: "16px",
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            University of San Agustin
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
