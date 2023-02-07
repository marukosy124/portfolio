import styles from "./index.module.scss"

interface IconLabelButtonGroupProps {
  buttons: {
    show: boolean
    label: string
    icon: JSX.Element
    onClick: () => void
  }[]
}

const IconLabelButtonGroup: React.FC<IconLabelButtonGroupProps> = (props) => {
  return (
    <div className={styles.ButtonGroup}>
      {props.buttons
        .filter((btn) => btn.show)
        .map((btn) => (
          <div
            key={btn.label}
            className={`${styles.button} ${styles.flexCenter}`}
            onClick={btn.onClick}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </div>
        ))}
    </div>
  )
}

export default IconLabelButtonGroup
