import { AnimatePresence } from "framer-motion"
import React, { ReactNode } from "react"
import styles from "./index.module.scss"

interface ContainerProps {
  children: ReactNode
}

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <div className={styles.Container}>{props.children}</div>
    </AnimatePresence>
  )
}

export default Container
