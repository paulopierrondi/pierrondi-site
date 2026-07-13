import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "lime" | "cyan";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "border-transparent bg-primary text-on-primary": variant === "default" || variant === "lime",
          "border-hairline text-body bg-surface-card": variant === "outline",
          "border-transparent bg-accent-cyan/20 text-accent-cyan": variant === "cyan",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
