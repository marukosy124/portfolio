import styles from "./index.module.scss"

interface TypingTextProps {
  text: string
  fontSize: number
  style?: object
  className?: string
}

const TypingText: React.FC<TypingTextProps> = (props) => {
  return (
    <div
      className={`${styles.TypingText} ${props.className}`}
      style={{
        width: `${props.text.length}ch`,
        fontSize: `${props.fontSize}px`,
        ...props.style,
      }}
    >
      {props.text}
    </div>
  )
}

export default TypingText
