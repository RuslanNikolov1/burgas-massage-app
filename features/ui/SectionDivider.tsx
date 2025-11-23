import styles from './SectionDivider.module.scss'

export function SectionDivider() {
  return (
    <div className={styles.divider}>
      <div className={styles.line}></div>
    </div>
  )
}

