export interface PersonalInfo {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    summary?: string;
    links?: Link[];
}

export interface Link {
    name: string;
    url: string;
    hideLink?: boolean;
}

export interface WorkExperience {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    responsibilities: string[];
}

export interface Education {
    institution: string;
    degree: string;
    gpa?: string;
    startDate?: string;
    endDate?: string;
}

export interface Project {
    title: string;
    description: string;
    responsibilities: string[];
    website?: Link;
    sourceCode?: Link;
}

export interface Certification {
    name: string;
    dateAquired?: string;
}

export interface VolunteerWork {
    name: string;
    startDate: string;
    description?: string;
    endDate?: string;
}

export interface Language {
    name: string;
    proficiency: string;
}

export interface Accolade {
    name: string;
    description?: string;
    dateAquired?: string;
}

//Main Resume Data:

export interface ResumeData {
    personalInfo: PersonalInfo;
    workExperience?: WorkExperience[];
    education?: Education[];
    skills?: string[];
    projects?: Project[];
    certifications?: Certification[];
    languages?: Language[];
    volunteerWork?: VolunteerWork[];
    accolades?: Accolade[];
    promptInjection?: boolean;
}
