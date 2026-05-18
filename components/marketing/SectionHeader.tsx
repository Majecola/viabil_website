interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
}

export function SectionHeader({ eyebrow, heading, subheading, align = "center" }: SectionHeaderProps) {
  const textAlign = align === "left" ? "left" : "center";
  const maxWidth = align === "left" ? "none" : 640;

  return (
    <div style={{ textAlign, maxWidth, margin: align === "center" ? "0 auto 56px" : "0 0 40px" }}>
      {eyebrow && (
        <span style={{
          display: "inline-block",
          background: "#E8F4EE",
          color: "#0A4B35",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "4px 12px",
          borderRadius: 100,
          marginBottom: 16,
        }}>
          {eyebrow}
        </span>
      )}
      <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#1A2320", marginBottom: subheading ? 16 : 0, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
        {heading}
      </h1>
      {subheading && (
        <p style={{ fontSize: 18, color: "#374151", lineHeight: 1.7 }}>
          {subheading}
        </p>
      )}
    </div>
  );
}
