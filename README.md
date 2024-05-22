# Resume-Lite

**Resume-Lite** is a lightweight library for generating resumes in HTML format. It aims to be as lightweight as possible with 0 dependencies. This library takes structured data as input and produces a clean, professional resume in HTML format.

## Features

- **Lightweight**: No external dependencies.
- **Easy to Use**: Simple and intuitive API.
- **Customizable**: Easily modify the HTML template to fit your needs.
- **Structured Data**: Uses a clear schema for input data.

## Installation

Since Resume-Lite has no dependencies, you can simply download the `resume-lite.js` file and include it in your project.

```html
<script src="path/to/resume-lite.js"></script>
```

## Usage

```javascript
// Sample data following the ResumeData schema
const resumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-1234",
    address: "123 Main St, Anytown, USA",
    summary:
      "Experienced software developer with a passion for creating efficient and scalable applications.",
    links: [
      { name: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
      { name: "GitHub", url: "https://github.com/johndoe" },
    ],
  },
  workExperience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Developer",
      startDate: "2020-01",
      endDate: "2023-05",
      responsibilities: [
        "Developed and maintained web applications.",
        "Led a team of junior developers.",
        "Collaborated with cross-functional teams.",
      ],
    },
  ],
  education: [
    {
      institution: "State University",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2015-09",
      endDate: "2019-06",
    },
  ],
  skills: ["JavaScript", "HTML", "CSS", "React", "Node.js"],
  projects: [
    {
      title: "Project A",
      description: "A web application for managing tasks.",
      responsibilities: [
        "Designed the user interface.",
        "Implemented the backend using Node.js.",
        "Deployed the application on AWS.",
      ],
      website: "https://projecta.example.com",
      sourceCodeLink: "https://github.com/johndoe/projecta",
    },
  ],
  certifications: [
    {
      name: "Certified JavaScript Developer",
      dateAquired: "2020-12",
    },
  ],
  languages: ["English", "Spanish"],
  volunteerWork: [
    {
      name: "Community Tech Support",
      startDate: "2018-06",
      endDate: "2019-08",
      description: "Provided technical support to community members.",
    },
  ],
};

// Generate the HTML resume
const resumeHtml = ResumeLite.generate(resumeData);

// Insert the generated HTML into your page
document.getElementById("resume-container").innerHTML = resumeHtml;
```
