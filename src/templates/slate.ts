import { ResumeData } from '../resumeTypes';

/**
 * Generates an HTML string for a complete resume for the "Slate" template
 * using provided resume data. The Slate template places contact info, skills,
 * education, certifications and languages in a dark sidebar, and presents
 * work experience as a timeline in the main column.
 *
 * @param {ResumeData} resumeData - The resume data containing personal information, skills, work experience, and projects.
 * @returns {string} The generated HTML string representing the resume.
 */
export function slate(resumeData: ResumeData): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${resumeData.personalInfo.name}'s Resume</title>
            <style>
                ${stylesCSS()}
            </style>
        </head>
        <body>
            <div id="templateContainer" class="container">
                <aside class="sidebar">
                    ${headerHTML(resumeData)}

                    ${contactHTML(resumeData)}

                    ${resumeData.skills?.length ? skillsHTML(resumeData) : ''}

                    ${resumeData.education?.length ? educationHTML(resumeData) : ''}

                    ${resumeData.certifications?.length ? certificationsHTML(resumeData) : ''}

                    ${resumeData.languages?.length ? languagesHTML(resumeData) : ''}
                </aside>

                <main class="main">
                    ${resumeData.personalInfo.summary ? summaryHTML(resumeData) : ''}

                    ${resumeData.workExperience?.length ? experienceHTML(resumeData) : ''}

                    ${resumeData.projects?.length ? projectsHTML(resumeData) : ''}

                    ${resumeData.accolades?.length ? accoladesHTML(resumeData) : ''}

                    ${resumeData.volunteerWork?.length ? volunteerHTML(resumeData) : ''}
                </main>
            </div>
        </body>
    </html>
    `;
}

function stylesCSS() {
    return `
        html {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 9.5pt;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            color: #334155;
            background-color: #fff;
        }
        a {
            color: inherit;
            text-decoration: none;
        }
        .container {
            display: flex;
            min-height: 100vh;
            overflow: hidden;
        }
        .sidebar {
            flex: 0 0 30%;
            width: 30%;
            box-sizing: border-box;
            padding: 36px 22px;
            background-color: #1e293b;
            color: #cbd5e1;
        }
        .main {
            flex: 1;
            padding: 36px 32px;
        }
        .sidebar h1 {
            font-size: 22pt;
            font-weight: 300;
            line-height: 1.1;
            color: #fff;
            margin: 0;
        }
        .sidebar h1 strong {
            font-weight: 700;
        }
        .sidebar .headline {
            margin-top: 6px;
            font-size: 8.5pt;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #2dd4bf;
        }
        .sidebar-section {
            margin-top: 22px;
        }
        .sidebar-section h2 {
            font-size: 8pt;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #fff;
            margin: 0 0 8px;
            padding-bottom: 5px;
            border-bottom: 1px solid #334155;
        }
        .contact-item {
            margin-bottom: 6px;
            word-break: break-word;
        }
        .contact-item .label {
            display: block;
            font-size: 7pt;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #64748b;
        }
        .pills {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        .pill {
            padding: 2px 8px;
            border: 1px solid #2dd4bf55;
            border-radius: 999px;
            background-color: #2dd4bf14;
            color: #e2e8f0;
            font-size: 8pt;
        }
        .sidebar-entry {
            margin-bottom: 9px;
        }
        .sidebar-entry .title {
            color: #fff;
            font-weight: 600;
        }
        .sidebar-entry .meta {
            font-size: 8pt;
            color: #94a3b8;
        }
        .language-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        .meter {
            display: flex;
            gap: 3px;
            margin-top: 3px;
        }
        .meter span {
            flex: 1;
            height: 4px;
            border-radius: 2px;
            background-color: #334155;
        }
        .meter span.filled {
            background-color: #2dd4bf;
        }
        .section {
            margin-bottom: 20px;
        }
        .section:last-child {
            margin-bottom: 0;
        }
        .section h2 {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 10pt;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #0f172a;
            margin: 0 0 10px;
        }
        .section h2::before {
            content: '';
            width: 22px;
            height: 3px;
            border-radius: 2px;
            background-color: #14b8a6;
        }
        .summary {
            margin: 0;
            font-size: 10pt;
            color: #475569;
        }
        .timeline {
            position: relative;
            padding-left: 18px;
            border-left: 2px solid #e2e8f0;
            margin-left: 4px;
        }
        .job {
            position: relative;
            margin-bottom: 14px;
            page-break-inside: avoid;
        }
        .job:last-child {
            margin-bottom: 0;
        }
        .job::before {
            content: '';
            position: absolute;
            left: -25px;
            top: 3px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #fff;
            border: 2px solid #14b8a6;
        }
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        .job-title {
            font-size: 10.5pt;
            font-weight: 700;
            color: #0f172a;
        }
        .job-company {
            font-weight: 600;
            color: #0f766e;
        }
        .job-date {
            font-size: 8pt;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #94a3b8;
            white-space: nowrap;
            padding-left: 1em;
        }
        .job ul,
        .project ul {
            margin: 4px 0 0;
            padding-left: 1.2em;
        }
        .job li,
        .project li {
            margin-bottom: 2px;
        }
        .project {
            margin-bottom: 12px;
            padding: 10px 14px;
            border-left: 3px solid #14b8a6;
            border-radius: 0 6px 6px 0;
            background-color: #f8fafc;
            page-break-inside: avoid;
        }
        .project:last-child {
            margin-bottom: 0;
        }
        .project p {
            margin: 2px 0 0;
            color: #475569;
        }
        .project-links {
            margin-top: 4px;
            font-size: 8pt;
            font-weight: 600;
            color: #0f766e;
        }
        .project-links a + a {
            margin-left: 12px;
        }
        .compact-entry {
            margin-bottom: 8px;
        }
        .compact-entry:last-child {
            margin-bottom: 0;
        }
    `;
}

function headerHTML(resumeData: ResumeData) {
    // Bold the last name, e.g. "Jane <strong>Smith</strong>"
    const nameParts = resumeData.personalInfo.name.trim().split(/\s+/);
    const lastName = nameParts.length > 1 ? nameParts.pop() : '';
    const headline = resumeData.workExperience?.[0]?.position;

    return `
        <h1 id="name">${nameParts.join(' ')}${lastName ? `<br /><strong>${lastName}</strong>` : ''}</h1>
        ${headline ? `<div class="headline">${headline}</div>` : ''}
    `;
}

function contactHTML(resumeData: ResumeData) {
    const { email, phone, address, links } = resumeData.personalInfo;

    return `
        <div class="sidebar-section">
            <h2>Contact</h2>
            <div class="contact-item"><span class="label">Email</span><a href="mailto:${email}">${email}</a></div>
            ${phone ? `<div class="contact-item"><span class="label">Phone</span>${phone}</div>` : ''}
            ${address ? `<div class="contact-item"><span class="label">Location</span>${address}</div>` : ''}
            ${
                links
                    ?.map(
                        (link) =>
                            `<div class="contact-item"><span class="label">${link.name}</span><a href="${link.url}">${link.hideLink ? link.name : link.url.replace(/^https?:\/\//, '')}</a></div>`
                    )
                    .join('') ?? ''
            }
        </div>
    `;
}

function skillsHTML(resumeData: ResumeData) {
    return `
        <div class="sidebar-section">
            <h2>Skills</h2>
            <div class="pills">
                ${resumeData.skills?.map((skill) => `<span class="pill">${skill}</span>`).join('') ?? ''}
            </div>
        </div>
    `;
}

function educationHTML(resumeData: ResumeData) {
    return `
        <div class="sidebar-section">
            <h2>Education</h2>
            ${
                resumeData.education
                    ?.map(
                        (education) => `
                            <div class="sidebar-entry">
                                <div class="title">${education.degree}</div>
                                <div>${education.institution}</div>
                                ${education.startDate || education.endDate || education.gpa ? `<div class="meta">${[education.startDate && education.endDate ? `${education.startDate} &ndash; ${education.endDate}` : education.startDate ?? education.endDate, education.gpa ? `GPA ${education.gpa}` : ''].filter((part) => part).join(' &middot; ')}</div>` : ''}
                            </div>
                            `
                    )
                    .join('') ?? ''
            }
        </div>
    `;
}

function certificationsHTML(resumeData: ResumeData) {
    return `
        <div class="sidebar-section">
            <h2>Certifications</h2>
            ${
                resumeData.certifications
                    ?.map(
                        (certification) => `
                            <div class="sidebar-entry">
                                <div class="title">${certification.name}</div>
                                ${certification.dateAquired ? `<div class="meta">${certification.dateAquired}</div>` : ''}
                            </div>
                            `
                    )
                    .join('') ?? ''
            }
        </div>
    `;
}

// Maps common proficiency words to a 1-5 level for the meter. Unknown values show text only.
const PROFICIENCY_LEVELS: Record<string, number> = {
    native: 5,
    bilingual: 5,
    fluent: 5,
    advanced: 4,
    professional: 4,
    proficient: 4,
    intermediate: 3,
    conversational: 2,
    elementary: 2,
    basic: 1,
    beginner: 1,
};

function languagesHTML(resumeData: ResumeData) {
    return `
        <div class="sidebar-section">
            <h2>Languages</h2>
            ${
                resumeData.languages
                    ?.map((language) => {
                        const level = PROFICIENCY_LEVELS[language.proficiency.trim().toLowerCase()];
                        const meter = level
                            ? `<div class="meter">${[1, 2, 3, 4, 5].map((i) => `<span class="${i <= level ? 'filled' : ''}"></span>`).join('')}</div>`
                            : '';

                        return `
                            <div class="sidebar-entry">
                                <div class="language-row">
                                    <span class="title">${language.name}</span>
                                    <span class="meta">${language.proficiency}</span>
                                </div>
                                ${meter}
                            </div>
                            `;
                    })
                    .join('') ?? ''
            }
        </div>
    `;
}

function summaryHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Profile</h2>
            <p class="summary">${resumeData.personalInfo.summary}</p>
        </div>
    `;
}

function experienceHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Experience</h2>
            <div class="timeline">
                ${
                    resumeData.workExperience
                        ?.map(
                            (job) => `
                                <div class="job">
                                    <div class="job-header">
                                        <span class="job-title">${job.position}</span>
                                        <span class="job-date">${job.startDate} &ndash; ${job.endDate ?? 'Present'}</span>
                                    </div>
                                    <div class="job-company">${job.company}</div>
                                    <ul>
                                        ${job.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}
                                    </ul>
                                </div>
                                `
                        )
                        .join('') ?? ''
                }
            </div>
        </div>
    `;
}

function projectsHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Projects</h2>
            ${
                resumeData.projects
                    ?.map((project) => {
                        const links = [project.website, project.sourceCode]
                            .filter((link) => link)
                            .map(
                                (link) =>
                                    `<a href="${link!.url}">${link!.hideLink ? link!.name : link!.url.replace(/^https?:\/\//, '')} &#8599;</a>`
                            )
                            .join('');

                        return `
                            <div class="project">
                                <div class="job-title">${project.title}</div>
                                <p>${project.description}</p>
                                <ul>
                                    ${project.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}
                                </ul>
                                ${links ? `<div class="project-links">${links}</div>` : ''}
                            </div>
                            `;
                    })
                    .join('') ?? ''
            }
        </div>
    `;
}

function accoladesHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Accolades</h2>
            ${
                resumeData.accolades
                    ?.map(
                        (accolade) => `
                            <div class="compact-entry">
                                <div class="job-header">
                                    <span class="job-title">${accolade.name}</span>
                                    ${accolade.dateAquired ? `<span class="job-date">${accolade.dateAquired}</span>` : ''}
                                </div>
                                ${accolade.description ? `<div>${accolade.description}</div>` : ''}
                            </div>
                            `
                    )
                    .join('') ?? ''
            }
        </div>
    `;
}

function volunteerHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Volunteer Work</h2>
            ${
                resumeData.volunteerWork
                    ?.map(
                        (volunteer) => `
                            <div class="compact-entry">
                                <div class="job-header">
                                    <span class="job-title">${volunteer.name}</span>
                                    <span class="job-date">${volunteer.startDate} &ndash; ${volunteer.endDate ?? 'Present'}</span>
                                </div>
                                ${volunteer.description ? `<div>${volunteer.description}</div>` : ''}
                            </div>
                            `
                    )
                    .join('') ?? ''
            }
        </div>
    `;
}
