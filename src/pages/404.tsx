// custom pages/404.jsx !! Do not remove please or it will break build
import { RiErrorWarningLine } from "react-icons/ri"
import styles from "@styles/common.module.scss"

export default function Error() {
  return (
    <div className={styles.Error}>
      <RiErrorWarningLine fontSize={50} />
      <h2>404 - Something went wrong</h2>
    </div>
  )
}
