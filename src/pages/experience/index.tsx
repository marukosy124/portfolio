import { useCallback, useEffect } from "react"
import styles from "./index.module.scss"
import { FRAME_TRANSITIONS, FRAME_VARIANTS } from "@/helpers/constants"
import { MdTaskAlt } from "react-icons/md"
import { motion } from "framer-motion"
import TypingText from "@/components/TypingText"
import useDeviceDetect from "@/hooks/useViewport"
import matter from "gray-matter"
import path from "path"
import fs from "fs"
import { IEducation, IExperience } from "@/helpers/types"

const INDEX_TO_START = 2
const OFFSET = 100

interface ExperienceProps {
  education: IEducation
  work: IExperience[]
}

const Experience = ({ education, work }: ExperienceProps) => {
  const { isMobile } = useDeviceDetect()

  const callbackFunc = useCallback((items: NodeListOf<HTMLLIElement>) => {
    for (let i = INDEX_TO_START; i < items.length; i++) {
      if (isItemInView(items[i])) {
        items[i].classList.add(styles.show)
      }
    }
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll("li")
    // listen for events
    window.addEventListener("load", () => callbackFunc(items))
    window.addEventListener("resize", () => callbackFunc(items))
    window.addEventListener("scroll", () => callbackFunc(items))
  }, [callbackFunc])

  const isItemInView = (item: HTMLLIElement) => {
    const rect = item.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight + OFFSET ||
          document.documentElement.clientHeight + OFFSET) &&
      rect.right <=
        (window.innerWidth + OFFSET ||
          document.documentElement.clientWidth + OFFSET)
    )
  }

  return (
    <motion.main
      variants={FRAME_VARIANTS}
      initial='hidden'
      animate='enter'
      exit='exit'
      transition={FRAME_TRANSITIONS}
    >
      <div className={styles.ExperiencePage}>
        <TypingText text='Experience' fontSize={32} />
        <div className={styles.container}>
          <h2>[Education]</h2>
          <h3 style={{ color: styles.primaryColor }}>{education.title}</h3>
          <div className={styles.EduContainer}>
            <time className={styles.time}>{education.time}</time>
            <span>{education.school}</span>
          </div>
          <ul>
            {education.description.map((desc: string, index: number) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.container} ${styles.work}`}>
          <h2>[Work]</h2>
          {isMobile ? (
            <>
              {work.map((exp: IExperience, index: number) => (
                <div className={styles.item} key={index}>
                  <div className={styles.TimeTypeContainer}>
                    <p className={styles.type}>{exp.type}</p>
                    <time>{exp.time}</time>
                  </div>
                  <h3>{exp.title}</h3>
                  <h5>
                    {exp.company} - {exp.location}
                  </h5>
                  {exp.description.map((desc: string, i: number) => (
                    <span className={styles.desc} key={i}>
                      <span>
                        <MdTaskAlt className={styles.icon} />
                      </span>
                      {desc}{" "}
                    </span>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <ul>
              {work.map((exp: IExperience, index: number) => (
                <li
                  className={index < INDEX_TO_START ? styles.show : ""}
                  key={index}
                >
                  <div>
                    <time>{exp.time}</time>
                    <p className={styles.type}>{exp.type}</p>
                    <h3>{exp.title}</h3>
                    <h5>
                      {exp.company} - {exp.location}
                    </h5>
                    {exp.description.map((desc, i) => (
                      <span className={styles.desc} key={i}>
                        <span>
                          <MdTaskAlt className={styles.icon} />
                        </span>
                        {desc}{" "}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.main>
  )
}

export default Experience

export async function getStaticProps() {
  const file = fs.readFileSync(path.join("content/experience.md"), "utf-8")
  const { data } = matter(file)
  return {
    props: {
      education: data.education,
      work: data.work,
    },
  }
}
