import styles from "./index.module.scss"

interface TagProps {
  value: string
  active?: boolean
  onClick: () => void
}

const Tag: React.FC<TagProps> = (props) => {
  return (
    <span
      className={`${styles.Tag} ${props.active ? styles.active : ""}`}
      onClick={props.onClick}
    >
      #{props.value}
    </span>
  )
}

export default Tag
