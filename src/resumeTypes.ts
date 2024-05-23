export interface PersonalInfo {
  name: string
  email: string
  phone?: string
  address?: string
  summary?: string
  links?: {
    name: string
    url: string
  }[]
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate?: string
  responsibilities: string[]
}

export interface Education {
  institution: string
  degree: string
  startDate?: string
  endDate: string
}

export interface Project {
  title: string
  description: string
  responsibilities: string[]
  website?: string
  sourceCodeLink?: string
}

export interface Certification {
  name: string
  dateAquired: string
}

export interface VolunteerWork {
  name: string
  startDate: string
  description?: string
  endDate?: string
}

export interface Language {
  name: string
  proficiency: string
}

//Main Resume Data:

export interface ResumeData {
  personalInfo: PersonalInfo
  workExperience?: WorkExperience[]
  education?: Education[]
  skills?: string[]
  projects?: Project[]
  certifications?: Certification[]
  languages?: Language[]
  volunteerWork?: VolunteerWork[]
}
