export interface IProject {
  name: string
  description: string
  github: string
  preview: any
  demo: string
  tech: ISkill[]
  tags: ETags[]
  createdAt: Date
}
export interface ISkill {
  title: string
  type: ESkillType
  isStarred?: boolean
}

export enum ESkillType {
  PROGRAMMING = "Programming Languages",
  FRONTEND = "Frontend Development",
  BACKEND = "Backend Development",
  MOBILE = "Mobile App Development",
  DATABASE = "Database",
  CLOUD = "Cloud Services",
  OTHERS = "Others",
  LANGUAGE = "Languages",
}

export enum EJobType {
  PART_TIME = "Part-time",
  FULL_TIME = "Full-time",
  INTERN = "Internship",
}

export interface IEducation {
  title: string
  school: string
  time: string
  description: string[]
}
export interface IExperience {
  time: string
  title: string
  company: string
  type: EJobType
  description: string[]
}

export enum ETags {
  WEB_DEV = "Web Development",
  WEB3_DEV = "Web3 Development",
  BUSINESS = "Business Solution",
  DAPP = "DApp",
  SPA = "SPA",
  MINI_PROJECT = "Mini Project",
  GROUP_PROJECT = "Group Project",
  INDIVIDUAL_PROJECT = "Individual Project",
  A_GRADE = "A-Grade",
  APP_DEV = "Mobile App Development",
  SIDE_PROJECT = "Side Project",
  OPEN_SOURCE_PROJECT = "Open-source Project",
}
