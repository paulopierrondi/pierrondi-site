import Link from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface PortfolioLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  external?: boolean
  children: ReactNode
}

export default function PortfolioLink({
  href,
  external = false,
  children,
  ...props
}: PortfolioLinkProps) {
  const opensExternally = external || /^https?:\/\//.test(href)

  if (opensExternally) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
