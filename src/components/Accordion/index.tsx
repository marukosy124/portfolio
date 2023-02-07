import { FaChevronDown } from "react-icons/fa"
import { useState } from "react"
import styles from "./index.module.scss"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

interface AccordionProps {
  items: AccordionItemProps[]
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleExpand = (title: string) => {
    setExpandedItems(
      expandedItems.includes(title)
        ? expandedItems.filter((item) => item !== title)
        : [...expandedItems, title]
    )
  }

  return (
    <div className={styles.Accordion}>
      {props.items.map((item, index) => (
        <div key={index} className={styles.item} id={item.title}>
          <div className={styles.link} onClick={() => handleExpand(item.title)}>
            <h3>{item.title}</h3>
            <FaChevronDown
              className={`${styles.icon} ${
                expandedItems.includes(item.title) ? styles.rotate : ""
              }`}
            />
          </div>
          <div
            className={`${styles.SkillContainer} ${
              expandedItems.includes(item.title) ? styles.expanded : ""
            }`}
          >
            {item.children}
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Accordion
