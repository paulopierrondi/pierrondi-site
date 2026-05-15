'use client'

import React from "react"
import styles from "./PillButton.module.css"

export interface PillButtonProps {
  variant?: "primary" | "ghost" | "dark-utility" | "pearl"
  size?: "default" | "large"
  href?: string
  target?: string
  rel?: string
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  className?: string
  disabled?: boolean
  style?: React.CSSProperties
  children: React.ReactNode
}

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-system)",
  fontSize: "17px",
  fontWeight: 400,
  letterSpacing: "-0.374px",
  lineHeight: 1,
  cursor: "pointer",
  textDecoration: "none",
  whiteSpace: "nowrap",
  userSelect: "none",
  transition: "transform 0.1s ease, background-color 0.15s ease",
  WebkitTapHighlightColor: "transparent",
}

const variantStyles: Record<
  NonNullable<PillButtonProps["variant"]>,
  React.CSSProperties
> = {
  primary: {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-on-primary)",
    border: "none",
    borderRadius: "var(--radius-pill)",
    padding: "11px 22px",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-accent-cyan)",
    border: "1px solid var(--color-accent-cyan)",
    borderRadius: "var(--radius-pill)",
    padding: "11px 22px",
  },
  "dark-utility": {
    backgroundColor: "var(--color-ink)",
    color: "var(--color-on-dark)",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "8px 15px",
  },
  pearl: {
    backgroundColor: "var(--color-surface-pearl)",
    color: "var(--color-ink-muted-80)",
    border: "3px solid var(--color-divider-soft)",
    borderRadius: "var(--radius-md)",
    padding: "8px 14px",
  },
}

const largeStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 300,
  padding: "14px 28px",
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
  pointerEvents: "none",
}

export function PillButton({
  variant = "primary",
  size = "default",
  href,
  target,
  rel,
  type = "button",
  onClick,
  className,
  disabled = false,
  style,
  children,
}: PillButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    ...variantStyles[variant],
    ...(size === "large" ? largeStyle : {}),
    ...(disabled ? disabledStyle : {}),
    ...(isFocused && !disabled
      ? {
          outline: "2px solid var(--color-accent-cyan)",
          outlineOffset: "2px",
        }
      : {}),
    ...style,
  }

  const motionClass = styles["pill-btn"]
  const pressedClass = isPressed && !disabled ? styles.pressed : undefined
  const combinedClassName = [motionClass, pressedClass, className].filter(Boolean).join(" ")

  const interactionProps = {
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseLeave: () => setIsPressed(false),
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
    onTouchCancel: () => setIsPressed(false),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    onClick: disabled ? undefined : onClick,
    style: combinedStyle,
    className: combinedClassName,
  }

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...interactionProps}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      {...interactionProps}
    >
      {children}
    </button>
  )
}

export default PillButton
