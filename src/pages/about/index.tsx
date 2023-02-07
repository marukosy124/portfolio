import TypingText from "@/components/TypingText"
import { FRAME_TRANSITIONS, FRAME_VARIANTS } from "@/helpers/constants"
import { motion } from "framer-motion"
import styles from "./index.module.scss"
import Image from "next/image"
import TechChip from "@/components/TechChip"
import { ESkillType, ISkill } from "@/helpers/types"
import { Fragment } from "react"
import matter from "gray-matter"
import path from "path"
import fs from "fs"
import { marked } from "marked"

const About = ({ data, content }) => {
  return (
    <motion.main
      variants={FRAME_VARIANTS}
      initial='hidden'
      animate='enter'
      exit='exit'
      transition={FRAME_TRANSITIONS}
    >
      <div className={styles.AboutPage}>
        <TypingText text='About Me' fontSize={32} />
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.intro}>
              <h2>Sonia Yeung</h2>
              <h3>{data.jobTitle}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(content),
                }}
              />
            </div>
            <div>
              <Image
                src='/assets/profile.jpg'
                width={300}
                height={300}
                alt='profile'
              />
            </div>
          </div>
        </div>
        <h2>My Skills</h2>
        {Object.keys(ESkillType).map((key) => (
          <Fragment key={key}>
            <h3 className={styles.SkillTitle}>{ESkillType[key]}</h3>
            <div className={styles.SkillContainer}>
              {data.skills
                .filter((skill: ISkill) => skill.type === ESkillType[key])
                .map((skill: ISkill) => (
                  <TechChip
                    key={skill.title}
                    tech={skill}
                    style={{
                      fontSize: 14,
                      padding: "5px 10px",
                      marginRight: 10,
                      cursor: "auto",
                    }}
                  />
                ))}
            </div>
            <hr />
          </Fragment>
        ))}
      </div>
    </motion.main>
  )
}

export default About

export async function getStaticProps() {
  const file = fs.readFileSync(path.join("content/about.md"), "utf-8")
  const { data, content } = matter(file)
  return {
    props: {
      data,
      content,
    },
  }
}
