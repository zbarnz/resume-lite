interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  summary?: string;
  links?: {
    name: string;
    url: string;
  }[];
}

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
}

interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
}

interface Project {
  title: string;
  description: string;
  responsibilities: string[];
  website?: string;
  sourceCodeLink?: string;
}

interface Certification {
  name: string;
  dateAquired: string;
}

interface VolunteerWork {
  name: string;

  startDate: string;
  description: string;
  endDate?: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience?: WorkExperience[];
  education?: Education[];
  skills?: string[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: string[];
  volunteerWork?: VolunteerWork[];
}
