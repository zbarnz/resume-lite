# Resume-Lite

**Resume-Lite** is a lightweight library designed for generating resumes in HTML format. With zero dependencies, it ensures minimal overhead and maximum simplicity. By taking structured data as input, this library produces clean and professional resumes in HTML, making it an ideal tool for developers looking to create customizable resume templates with ease.

## Features

-   **Lightweight**: No external dependencies.
-   **Easy to Use**: Simple and intuitive API.
-   **Customizable**: Easily modify the HTML template to fit your needs.
-   **Structured Data**: Uses a clear schema for input data.

## Templates
*We are currently working on adding more templates*
<table>
  <tr>
    <th>Stack</th>
    <th>Edge</th>
  </tr>
  <tr>
    <td><img src="https://i.imgur.com/Fx56vR4.jpg" width="200px" /></td>
    <td><img src="https://i.imgur.com/gmkQ3lC.jpeg" width="200px"  /></td>
    </td>
  </tr>
</table>

## Usage

<details><summary><b>Sample Data</b></summary><p>

```typescript
const testData: ResumeData = {
    personalInfo: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '555-123-4567',
        address: '456 Elm Street, Metropolis, USA',
        summary:
            'Seasoned software engineer with over 10 years of experience in full-stack development, project management, and team leadership. Proven track record of delivering high-quality software solutions on time and within budget.',
        links: [
            { name: 'LinkedIn', url: 'https://linkedin.com/in/janesmith' },
            { name: 'GitHub', url: 'https://github.com/janesmith' },
            { name: 'Portfolio', url: 'https://janesmith.dev' },
        ],
    },
    workExperience: [
        {
            company: 'Global Tech Solutions',
            position: 'Lead Software Engineer',
            startDate: 'April 2018',
            endDate: 'Present',
            responsibilities: [
                'Leading a team of 10 developers in designing, developing, and maintaining enterprise-level software applications.',
                'Implementing agile methodologies to improve project delivery times and team productivity.',
                'Collaborating with stakeholders to define project requirements and deliverables.',
                'Mentoring junior developers and conducting code reviews to ensure coding standards and best practices.',
            ],
        },
        {
            company: 'Innovative Apps LLC',
            position: 'Senior Software Engineer',
            startDate: 'May 2014',
            endDate: 'March 2018',
            responsibilities: [
                'Developed and maintained mobile applications using React Native and Flutter.',
                'Implemented RESTful APIs with Node.js and Express.',
                'Worked closely with UX/UI designers to create intuitive and user-friendly interfaces.',
                'Optimized application performance and resolved complex technical issues.',
            ],
        },
        {
            company: 'Tech Innovators Inc.',
            position: 'Software Engineer',
            startDate: 'September 2010',
            endDate: 'May 2014',
            responsibilities: [
                'Developed web applications using JavaScript, HTML, and CSS.',
                'Integrated third-party APIs to enhance application functionality.',
                'Collaborated with cross-functional teams to ensure seamless integration of new features.',
                'Participated in code reviews and contributed to the development of coding standards.',
            ],
        },
    ],
    education: [
        {
            institution: 'Metropolis University',
            degree: 'Master of Science in Computer Science',
            endDate: '2010-06-30',
        },
        {
            institution: 'Metropolis University',
            degree: 'Bachelor of Science in Computer Science',
            startDate: '2004-09-01',
            endDate: '2008-06-30',
        },
    ],
    skills: [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'Python',
        'Django',
        'Java',
        'Spring Boot',
        'SQL',
        'NoSQL',
        'Docker',
        'Kubernetes',
        'AWS',
        'Azure',
        'Git',
        'Agile Methodologies',
        'Project Management',
        'Team Leadership',
    ],
    projects: [
        {
            title: 'E-commerce Platform',
            description: 'Developed a scalable e-commerce platform for small businesses.',
            responsibilities: [
                'Led the front-end development using React and Redux.',
                'Implemented the back-end API with Node.js and Express.',
                'Designed and managed the database schema using MongoDB.',
                'Deployed the application on AWS using Docker and Kubernetes.',
            ],
            website: 'https://ecommerceplatform.com',
            sourceCodeLink: 'https://github.com/janesmith/ecommerce-platform',
        },
        {
            title: 'Project Management Tool',
            description: 'Created a project management tool to improve team collaboration.',
            responsibilities: [
                'Designed the user interface with Angular and Material Design.',
                'Developed the server-side logic with Spring Boot and Java.',
                'Integrated real-time collaboration features using WebSockets.',
                'Implemented user authentication and authorization with OAuth2.',
            ],
            website: 'https://projectmanagementtool.com',
            sourceCodeLink: 'https://github.com/janesmith/project-management-tool',
        },
    ],
    certifications: [
        {
            name: 'Certified Scrum Master',
            dateAquired: '2016-05-01',
        },
        {
            name: 'AWS Certified Solutions Architect',
            dateAquired: '2017-11-01',
        },
        {
            name: 'Google Cloud Professional Data Engineer',
            dateAquired: '2018-08-01',
        },
    ],
    languages: [
        {
            name: 'English',
            proficiency: 'Native',
        },
        {
            name: 'Spanish',
            proficiency: 'Fluent',
        },
        {
            name: 'German',
            proficiency: 'Intermediate',
        },
    ],
    volunteerWork: [
        {
            name: 'Code for Good',
            startDate: '2019-01-01',
            description: 'Taught coding workshops to underprivileged youth.',
            endDate: '2020-12-31',
        },
        {
            name: 'Open Source Contributor',
            startDate: '2016-01-01',
            description:
                'Contributed to various open-source projects, focusing on bug fixes and feature enhancements.',
        },
    ],
};
```

</p></details>
<br>

### Install the Package

```
npm i resume-lite
```

### Implementation

```javascript
import resume from 'resume-lite';
import { sampleData } from './sampleData';

function generateNewResume() {
    const html = resume.generate(stack, sampleData);
    console.log(html);
}

generateNewResume();
```

### Conversion to PDF Example

We recommend using puppeteer for HTML to PDF conversion

```javascript
import resume from 'resume-lite';
import puppeteer from 'puppeteer';

const html = resume.generate(template, testData);

//Launch new puppeteer page
const browser = await puppeteer.launch();
const page = await browser.newPage();

//Set page content to generated resume HTML
await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 0 });

//Get resume height
const height = await page.evaluate(() => document.documentElement.scrollHeight);

//Puppeteer built in PDF generator
const pdfBuffer = await page.pdf({
    width: '8.27in',   // A4 width in inches
    height,
    printBackground: true,
});

//Write file locally
fs.writeFileSync(`resume.pdf`, buffer);

await page.close();
await browser.close();
```