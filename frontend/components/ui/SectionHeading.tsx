import type { HTMLAttributes, ReactNode } from "react";

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  ...props
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div
      className={`section-heading ${alignment} ${className}`.trim()}
      {...props}
    >
      {eyebrow && (
        <span className="section-heading-eyebrow">
          {eyebrow}
        </span>
      )}

      <h2 className="section-heading-title">
        {title}
      </h2>

      {description && (
        <p className="section-heading-description">
          {description}
        </p>
      )}
    </div>
  );
}