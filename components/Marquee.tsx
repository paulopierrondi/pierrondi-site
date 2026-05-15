import { home, type Lang } from '@/lib/i18n/home-copy'
import styles from './Marquee.module.css'

interface MarqueeProps {
  lang?: Lang
}

function MarqueeItems({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span key={item} className={styles.item}>
          <span className={styles.dot} aria-hidden="true" />
          {item}
        </span>
      ))}
    </>
  )
}

export default function Marquee({ lang = 'pt' }: MarqueeProps) {
  const items = home[lang].marquee
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.track}>
        <MarqueeItems items={items} />
        <MarqueeItems items={items} />
      </div>
    </div>
  )
}
