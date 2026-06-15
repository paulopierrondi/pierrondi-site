'use client'

import dynamic from 'next/dynamic'
import styles from './EnterpriseSwarmLoader.module.css'

const EnterpriseSwarm = dynamic(() => import('./EnterpriseSwarm'), {
  ssr: false,
  loading: () => <div className={styles.placeholder} aria-hidden="true" />,
})

export default function EnterpriseSwarmLoader() {
  return (
    <>
      <EnterpriseSwarm className={styles.canvas} />
      <div className={styles.bgGrade} aria-hidden="true" />
      <div className={styles.bgVignette} aria-hidden="true" />
    </>
  )
}
