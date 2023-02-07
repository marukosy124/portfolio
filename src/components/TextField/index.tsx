import styles from "./index.module.scss"
import { HiX } from "react-icons/hi"
interface TextFieldProps {
  value?: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  placeholder?: string
  reset?: { show: boolean; onClick: () => void }
  startIcon?: JSX.Element
  className?: string
  textarea?: boolean
  name?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
}

const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <div className={`${styles.Textfield} ${props.className}`}>
      <div
        className={`${styles.container} ${props.className} ${
          props.helperText ? styles.helper : ""
        }`}
      >
        {props.startIcon && (
          <span className={styles.startIcon}>{props.startIcon}</span>
        )}
        {props.textarea ? (
          <textarea
            className={props.startIcon ? styles.hasStartIcon : ""}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            disabled={props.disabled}
          />
        ) : (
          <input
            className={props.startIcon ? styles.hasStartIcon : ""}
            placeholder={props.placeholder}
            type='text'
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            disabled={props.disabled}
          />
        )}
        <span
          className={`${styles.underline} ${props.error ? styles.error : ""}`}
        ></span>
        {props.reset?.show && (
          <HiX
            className={styles.endIcon}
            onClick={props.reset?.onClick}
            fontSize={20}
          />
        )}
      </div>
      {props.helperText && (
        <span
          className={`${styles.helperText} ${props.error ? styles.error : ""}`}
        >
          {props.helperText}
        </span>
      )}
    </div>
  )
}

export default TextField
