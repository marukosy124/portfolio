import { ETags, IProject, ISkill } from "@/helpers/types"
import styles from "./index.module.scss"
import TechChip from "../TechChip"
import Tag from "../Tag"
import { MdOutlineLaunch } from "react-icons/md"
import { FaGithub } from "react-icons/fa"
import IconLabelButtonGroup from "../IconLabelButtonGroup"
import path from "path"

interface ProjectItemProps {
  project: IProject
  onTagClick: (tag: ETags) => void
  onTechClick: (tech: ISkill) => void
}

const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  const buttons = [
    {
      show: Boolean(props.project.github),
      label: "View on GitHub",
      icon: <FaGithub fontSize={20} />,
      onClick: () => handleUrlOnClick(props.project.github),
    },
    {
      show: Boolean(props.project.demo),
      label: "View Demo",
      icon: <MdOutlineLaunch fontSize={20} />,
      onClick: () => handleUrlOnClick(props.project.demo),
    },
  ]

  const handleUrlOnClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className={styles.ProjectItem}>
      <div
        className={styles.PreviewContainer}
        style={{
          backgroundImage: `url(${path.join(
            "assets/projects/",
            props.project.preview ?? ""
          )})`,
        }}
      ></div>
      <div className={styles.Content}>
        <div className={styles.NameContainer}>
          <p className={styles.name}>{props.project.name}</p>
          <div className={styles.IconContainer}>
            <IconLabelButtonGroup buttons={buttons} />
          </div>
        </div>
        <div className={styles.TechContainer}>
          {props.project.tech.map((tech) => (
            <TechChip
              tech={tech}
              onClick={() => props.onTechClick(tech)}
              key={tech.title}
            />
          ))}
        </div>
        <hr />
        <p className={styles.description}>{props.project.description}</p>
        <div className={styles.TagContainer}>
          {props.project.tags.map((tag) => (
            <Tag value={tag} onClick={() => props.onTagClick(tag)} key={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
