interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`section-kicker ${align === "center" ? "center" : ""} ${className}`}>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{heading}</h2>
      {subheading ? <p className="section-subtitle">{subheading}</p> : null}
    </div>
  );
}
