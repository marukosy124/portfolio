import { SNACKBAR_TIMEOUT } from "@/helpers/constants"
import React, { useState, forwardRef, useImperativeHandle } from "react"
import styles from "./index.module.scss"

interface SnackbarProps {
  message: string
  type: string
}

const Snackbar = forwardRef((props: SnackbarProps, ref) => {
  const [show, setShow] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, SNACKBAR_TIMEOUT)
    },
  }))

  return (
    <div
      className={`${styles.Snackbar} ${show ? styles.show : styles.hide}`}
      style={{
        backgroundColor:
          props.type === "success"
            ? styles.primaryColor
            : props.type === "error"
            ? styles.errorColor
            : styles.secondaryColor,
      }}
    >
      <div className='message'>{props.message}</div>
    </div>
  )
})

export default Snackbar
