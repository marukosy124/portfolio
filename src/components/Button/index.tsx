import styles from "./index.module.scss"

interface ButtonProps {
  startIcon?: JSX.Element
  label: string
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`${styles.Button} ${props.className}`}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span className={styles.text}>
        {props.startIcon}
        {props.label}
      </span>
    </button>
  )
}

export default Button
