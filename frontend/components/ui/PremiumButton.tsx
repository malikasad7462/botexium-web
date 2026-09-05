import type { ButtonHTMLAttributes } from "react";

type PremiumButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function PremiumButton({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: PremiumButtonProps) {
  const classes = [
    "premium-btn",
    variant === "secondary" ? "premium-btn-secondary" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      {...props}
    />
  );
}