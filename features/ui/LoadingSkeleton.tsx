import styles from './LoadingSkeleton.module.scss'

export function LoadingSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.shimmer} />
    </div>
  )
}






