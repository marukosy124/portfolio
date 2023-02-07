import styles from "./index.module.scss"
import styled, { keyframes } from "styled-components"

interface ProgressBarProps {
  progress: number
  title: string
  fontSize?: number
}

const load = (progress) => keyframes`
    0% {
      width: 0;
    }
    100% {
      width: ${progress}%;
    }
  `

const ValueDiv = styled.div`
  animation: ${(props) => load(props.progress)} 3s normal forwards;
`

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return (
    <div className={styles.ProgressBarContainer}>
      <div className={styles.ProgressBar}>
        <ValueDiv className={styles.value} progress={props.progress} />
      </div>
      <span className={styles.progress}>{props.progress}%</span>
    </div>
  )
}

export default ProgressBar
