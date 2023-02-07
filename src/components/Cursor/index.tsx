import { useEffect, useRef } from "react"
import styles from "./index.module.scss"

const Cursor = () => {
  const lightRef = useRef(null)
  const lightTailRef = useRef(null)

  // set light positions
  const moveLight = () => {
    document.addEventListener("mousemove", (e) => {
      if (lightRef.current && lightTailRef.current) {
        lightRef.current.setAttribute(
          "style",
          `top: ${e.pageY}px; left: ${e.pageX}px;`
        )
        lightTailRef.current.setAttribute(
          "style",
          `top: ${e.pageY}px; left: ${e.pageX}px;`
        )
      }
    })
  }

  const applyCursorRippleEffect = () => {
    document.addEventListener("click", (e) => {
      // create and apply ripple effect
      const ripple = document.createElement("div")
      ripple.className = styles.LightRipple
      document.body.appendChild(ripple)
      ripple.style.left = `${e.pageX}px`
      ripple.style.top = `${e.pageY}px`
      ripple.style.animation = `${styles.rippleEffect} .4s linear`

      // set light back to original class (need refactor later)
      ripple.onanimationend = () => {
        document.body.removeChild(ripple)
        if (lightRef.current && lightTailRef.current) {
          lightRef.current.className = styles.Light
          lightTailRef.current.className = `${styles.Light} ${styles.LightTail}`
        }
      }
    })
  }

  useEffect(() => {
    moveLight()
    applyCursorRippleEffect()
  }, [])

  return (
    <>
      <div className={styles.Light} ref={lightRef}></div>
      <div
        className={`${styles.Light} ${styles.LightTail}`}
        ref={lightTailRef}
      ></div>
    </>
  )
}
export default Cursor
