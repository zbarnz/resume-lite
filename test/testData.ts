import { ResumeData } from '../src/resumeTypes';

export const testData: ResumeData = {
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
            website: { name: 'Website', url: 'https://ecommerceplatform.com' },
            sourceCode: {
                name: 'Source',
                url: 'https://github.com/janesmith/ecommerce-platform',
            },
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
            website: { name: 'Website', url: 'https://projectmanagementtool.com' },
            sourceCode: {
                name: 'Source',
                url: 'https://github.com/janesmith/project-management-tool',
            },
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
    accolades: [
        {
            name: 'Appeared on CNET',
            description: 'Appeared on CNET for taking part in the "Code for Good" workshop',
        },
        {
            name: 'Presidential Award of Excellence',
            dateAquired: 'April 1st 2016',
        },
    ],
};
