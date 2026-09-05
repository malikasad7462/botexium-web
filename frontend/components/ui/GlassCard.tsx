import type { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function GlassCard({
  className = "",
  hover = true,
  ...props
}: GlassCardProps) {
  const classes = [
    "glass-card",
    hover ? "glass-card-hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}