import styles from "./index.module.scss"
import { FRAME_TRANSITIONS, FRAME_VARIANTS } from "@/helpers/constants"
import { useState } from "react"
import { HiOutlineSearch, HiX } from "react-icons/hi"
import { IoFilter } from "react-icons/io5"
import { motion } from "framer-motion"
import ProjectItem from "@/components/ProjectItem"
import Tag from "@/components/Tag"
import TextField from "@/components/TextField"
import TypingText from "@/components/TypingText"
import { ESkillType, ETags, IProject, ISkill } from "@/helpers/types"
import { FiInfo } from "react-icons/fi"
import matter from "gray-matter"
import path from "path"
import fs from "fs"
import { NextPage } from "next"
import dynamic from "next/dynamic"

const TechChip = dynamic(() => import("@/components/TechChip"), { ssr: false })
interface ProjectsProps {
  projects: IProject[]
  techStack: ISkill[]
  tags: ETags[]
}

const Projects: NextPage<ProjectsProps> = ({ projects, techStack, tags }) => {
  const INIT_FILTERS: { tech: ISkill[]; tags: ETags[] } = {
    tech: [],
    tags: [],
  }
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [filters, setFilters] = useState(INIT_FILTERS)
  const [query, setQuery] = useState<string>("")

  const handleSetFilters = (
    name: string,
    value: ETags | ISkill,
    fromItem?: boolean
  ) => {
    let newFilters = [...filters[name]]

    // if current filter already exists
    if (filters[name].includes(value)) {
      // if user sets filter from filter panel -> remove the current filter; else remain unchanged
      if (!fromItem) newFilters = newFilters.filter((item) => item !== value)
    } else {
      // if current filter does not exist -> add the current filter to filters
      newFilters = [...newFilters, value]
    }
    setFilters({ ...filters, [name]: newFilters })

    // open filter panel if user sets filter from project item tech chip
    if (fromItem) {
      setShowFilter(true)
    }
  }

  const checkObjExist = (parent: unknown[], sub: unknown[]) => {
    return sub.every((t) =>
      parent.some((i) => JSON.stringify(i) === JSON.stringify(t))
    )
  }

  const filterProjects = () => {
    const lowerCaseQuery = query.toLowerCase()

    // sort and fitler by query first
    let filteredProjects = [...projects]
      .sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      )
      .filter(
        (project) =>
          project.name.toLowerCase().includes(lowerCaseQuery) ||
          project.description.toLowerCase().includes(lowerCaseQuery) ||
          project.tech.some((t) =>
            t.title.toLowerCase().includes(lowerCaseQuery)
          ) ||
          project.tags.some((t) => t.toLowerCase().includes(lowerCaseQuery))
      )

    // if no filters
    if (JSON.stringify(filters) === JSON.stringify(INIT_FILTERS)) {
      return filteredProjects
    } else if (filters.tech.length > 0) {
      // if have tech filters but no tags filter
      if (filters.tags.length === 0) {
        return filteredProjects.filter((project) =>
          checkObjExist(project.tech, filters.tech)
        )
      } else {
        // if have tech filters and tags filter
        return filteredProjects.filter(
          (project) =>
            checkObjExist(project.tech, filters.tech) &&
            checkObjExist(project.tags, filters.tags)
        )
      }
    } else if (filters.tags.length > 0) {
      // if have tags filters but no tech filter
      if (filters.tech.length === 0) {
        return filteredProjects.filter((project) =>
          checkObjExist(project.tags, filters.tags)
        )
      }
    }
  }

  const handleQueryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <motion.main
      variants={FRAME_VARIANTS}
      initial='hidden'
      animate='enter'
      exit='exit'
      transition={FRAME_TRANSITIONS}
    >
      <div className={styles.ProjectsPage}>
        <TypingText text='Projects' fontSize={32} />
        <div className={styles.Toolbar}>
          <TextField
            value={query}
            onChange={handleQueryOnChange}
            placeholder='Search'
            reset={{ show: Boolean(query), onClick: () => setQuery("") }}
            startIcon={<HiOutlineSearch fontSize={20} />}
          />
          <div
            className={styles.filter}
            onClick={() => setShowFilter(!showFilter)}
          >
            <div className={styles.inner}>
              <IoFilter className={styles.button} fontSize={20} />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <div
          className={styles.Filterbar}
          style={{
            maxHeight: showFilter ? 200 : 0,
          }}
        >
          <div className={styles.title}>
            <span>Tech Stack</span>
            {filters.tech.length > 0 && (
              <div
                className={styles.reset}
                onClick={() => setFilters({ ...filters, tech: [] })}
              >
                <HiX width={10} />
                Reset
              </div>
            )}
          </div>
          <div className={styles.container}>
            {techStack.map((item) => (
              <TechChip
                key={item.title}
                tech={item}
                active={filters.tech.includes(item)}
                onClick={() => handleSetFilters("tech", item)}
              />
            ))}
          </div>
          <div className={styles.title}>
            <span>Tags</span>
            {filters.tags.length > 0 && (
              <div
                className={styles.reset}
                onClick={() => setFilters({ ...filters, tags: [] })}
              >
                <HiX width={10} />
                Reset
              </div>
            )}
          </div>
          <div className={styles.container}>
            {tags.map((item) => (
              <Tag
                value={item}
                active={filters.tags.includes(item)}
                onClick={() => handleSetFilters("tags", item)}
                key={item}
              />
            ))}
          </div>
        </div>
        <div className={styles.grid}>
          {filterProjects().length > 0 ? (
            filterProjects()
              .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())
              .map((project, index) => (
                <ProjectItem
                  project={project}
                  key={index}
                  onTagClick={(tag) => handleSetFilters("tags", tag, true)}
                  onTechClick={(tech) => handleSetFilters("tech", tech, true)}
                />
              ))
          ) : (
            <h3>No projects found</h3>
          )}
        </div>
        <div className={styles.Disclaimer}>
          <FiInfo />
          Disclaimer: Business projects presented here are for portfolio use
          only, I am not the official owner of the projects.
        </div>
      </div>
    </motion.main>
  )
}

export default Projects

export async function getStaticProps() {
  const aboutFile = fs.readFileSync(path.join("content/about.md"), "utf-8")
  const { data: aboutData } = matter(aboutFile)
  const file = fs.readFileSync(path.join("content/projects.md"), "utf-8")
  const { data: projectsData } = matter(file)

  const skillsMap = new Map(
    aboutData.skills.map(({ title, type }) => [title, { title, type }])
  )

  const getTags = (tech: string[]) => {
    return tech.map((t) => {
      const skill = skillsMap.get(t)
      return skill ?? { title: t, type: ESkillType.OTHERS }
    })
  }

  const projects = projectsData.projects.map((project) => ({
    ...project,
    tech: getTags(project.tech),
  }))

  return {
    props: {
      projects,
      techStack: Array.from(
        new Set(projects.reduce((prev, curr) => [...prev, ...curr.tech], []))
      ),
      tags: Array.from(
        new Set(projects.reduce((prev, curr) => [...prev, ...curr.tags], []))
      ),
    },
  }
}
