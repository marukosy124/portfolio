import styles from "./index.module.scss"

const Circle = () => {
  return (
    <div className={styles.Circle}>
      <svg height='300' width='300'>
        <circle cx='290' cy='290' r='230' fill={styles.primaryColor} />
        <circle cx='290' cy='290' r='220' fill='black' />
        <circle cx='290' cy='290' r='200' fill={styles.secondaryColor} />
        <circle cx='290' cy='290' r='180' fill='black' />
      </svg>
    </div>
  )
}
export default Circle
