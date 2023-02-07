import { HiOutlineCode } from "react-icons/hi"
import { GrMysql } from "react-icons/gr"
import {
  SiMongodb,
  SiTypescript,
  SiSass,
  SiPhp,
  SiJavascript,
  SiAndroid,
  SiFirebase,
  SiAmazonaws,
  SiGooglecloud,
  SiReact,
  SiPostgresql,
  SiGraphql,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiIonic,
  SiJquery,
  SiFlask,
  SiDocker,
  SiGit,
  SiHeroku,
  SiLinux,
  SiVercel,
  SiSvelte,
  SiVite,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import styles from "./index.module.scss"
import { RiVuejsFill } from "react-icons/ri"
import { MdOutlineLanguage } from "react-icons/md"
import { ESkillType, ISkill } from "@/helpers/types"

interface TechChipProps {
  tech: ISkill
  active?: boolean
  style?: object
  onClick?: () => void
}

const TechChip: React.FC<TechChipProps> = (props) => {
  const getChipStyle = () => {
    if (props.active === false) {
      return {
        background: "rgba(179, 179, 179, 0.36)",
        color: "#d9d9d9",
      }
    }
    switch (props.tech.type) {
      case ESkillType.PROGRAMMING:
        return {
          background: "rgba(144, 205, 244, 0.36)",
          color: "#80dfff",
        }
      case ESkillType.FRONTEND:
        return {
          background: "rgba(255, 102, 204, 0.36)",
          color: "#ffccee",
        }
      case ESkillType.BACKEND:
        return {
          background: "rgba(132, 225, 132, 0.36)",
          color: "#c2f0c2",
        }
      case ESkillType.DATABASE:
        return {
          background: "rgba(255, 128, 128, 0.36)",
          color: "#ffcccc",
        }
      case ESkillType.MOBILE:
        return {
          background: "rgba(153, 179, 255, 0.36)",
          color: "#eaf0fa",
        }
      case ESkillType.CLOUD:
        return {
          background: "rgb(255, 184, 77, 0.36)",
          color: "#ffe0b3",
        }
      case ESkillType.LANGUAGE:
        return {
          background: "rgba(179, 179, 179, 0.36)",
          color: "#d9d9d9",
        }
      default:
        return {
          background: "rgba(153, 153, 255, 0.36)",
          color: "#ccccff",
        }
    }
  }

  const getIcon = () => {
    switch (props.tech.title) {
      case "React":
      case "React Native":
        return <SiReact className={styles.FaIcon} />
      case "MongoDB":
        return <SiMongodb className={styles.FaIcon} />
      case "TypeScript":
        return <SiTypescript className={styles.FaIcon} />
      case "SCSS":
        return <SiSass className={styles.FaIcon} />
      case "PHP":
        return <SiPhp className={styles.FaIcon} />
      case "Java":
        return <FaJava className={styles.FaIcon} />
      case "Android":
      case "Android Developement (Java)":
        return <SiAndroid className={styles.FaIcon} />
      case "MySQL":
        return <GrMysql className={styles.FaIcon} />
      case "PostgreSQL":
        return <SiPostgresql className={styles.FaIcon} />
      case "GraphQL":
        return <SiGraphql className={styles.FaIcon} />
      case "Firebase":
        return <SiFirebase className={styles.FaIcon} />
      case "AWS":
        return <SiAmazonaws className={styles.FaIcon} />
      case "Google Cloud Platform":
        return <SiGooglecloud className={styles.FaIcon} />
      case "HTML":
        return <SiHtml5 className={styles.FaIcon} />
      case "CSS/ SCSS":
        return <SiCss3 className={styles.FaIcon} />
      case "Node.js":
        return <SiNodedotjs className={styles.FaIcon} />
      case "Express":
        return <SiExpress className={styles.FaIcon} />
      case "Vue":
        return <RiVuejsFill className={styles.FaIcon} />
      case "Next.js":
        return <SiNextdotjs className={styles.FaIcon} />
      case "Ionic":
        return <SiIonic className={styles.FaIcon} />
      case "jQuery":
        return <SiJquery className={styles.FaIcon} />
      case "Flask":
        return <SiFlask className={styles.FaIcon} />
      case "Heroku":
        return <SiHeroku className={styles.FaIcon} />
      case "Vercel":
        return <SiVercel className={styles.FaIcon} />
      case "Git":
        return <SiGit className={styles.FaIcon} />
      case "Linux":
        return <SiLinux className={styles.FaIcon} />
      case "Docker":
        return <SiDocker className={styles.FaIcon} />
      case "Svelte":
        return <SiSvelte className={styles.FaIcon} />
      case "Vite":
        return <SiVite className={styles.FaIcon} />
      default:
        if (props.tech.type === ESkillType.LANGUAGE) {
          return <MdOutlineLanguage className={styles.FaIcon} />
        } else {
          return <HiOutlineCode className={styles.FaIcon} />
        }
    }
  }

  return (
    <div
      className={styles.TechChip}
      style={{ ...getChipStyle(), ...props.style }}
      onClick={props.onClick}
    >
      {getIcon()}
      {props.tech.title}
    </div>
  )
}

export default TechChip
