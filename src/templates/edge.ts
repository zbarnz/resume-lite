import { ResumeData } from '../resumeTypes';

/**
 * Generates an HTML string for a complete resume for the "Edge" template
 * using provided resume data. The Edge template presents important sections
 * in a main vericle layout and sections less important sections to a side
 * layout
 *
 * @param {ResumeData} resumeData - The resume data containing personal information, skills, work experience, and projects.
 * @returns {string} The generated HTML string representing the resume.
 */
export function edge(resumeData: ResumeData): string {
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
                <div class="header">
                    <div class="name-links">
                        <h1 id="name">${resumeData.personalInfo.name}</h1>
                    </div>
                    <div class="contact-info">
                        <div id="email">${resumeData.personalInfo.email}</div>
                        ${resumeData.personalInfo.phone ? `<div id="phone">${resumeData.personalInfo.phone}</div>` : ''}
                        ${resumeData.personalInfo.address ? `<div id="address">${resumeData.personalInfo.address}</div>` : ''}
                    </div>
                </div>

                <div class="personal-info">
                    <p class="summary">${resumeData.personalInfo.summary ?? ''}</p>
                    <div class="links">
                        <h3>Links</h3>
                        <ul id="links">
                            ${resumeData.personalInfo.links?.map((link) => `<li><a href="${link.url}">${link.name}</a></li>`).join('') ?? ''}
                        </ul>
                    </div>
                </div>

                <div class="details">
                    <div class="main-details">
                        ${experienceHTML(resumeData)}

                        ${projectsHTML(resumeData)}

                        ${educationHTML(resumeData)}
                    </div>

                    <div class="side-details">
                        ${certificationsHTML(resumeData)}

                        ${volunteerHTML(resumeData)}

                        ${languagesHTML(resumeData)}
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;
}

function stylesCSS() {
    return `
        html {
            -webkit-print-color-adjust: exact;
        }
        body {
            font-family: 'Roboto', sans-serif;
            font-size: small;
            margin: 0;
            padding: 0;
            background-color: #f0f2f5;
            color: #333;
        }
        .container {
            padding: 20px 30px;
            background-color: #fff;
            overflow: hidden;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #4a90e2;
            margin-bottom: 10px;
        }
        .header h1 {
            font-size: 2.5em;
            color: #4a90e2;
        }
        .header .contact-info {
            text-align: right;
        }
        .header .contact-info div {
            margin-bottom: 5px;
        }
        .section {
            margin-bottom: 5px;
        }
        .section h2 {
            font-size: 1.8em;
            color: #4a90e2;
            margin-bottom: 15px;
            border-bottom: 2px solid #4a90e2;
            display: inline-block;
            padding-bottom: 5px;
        }
        .section h3 {
            font-size: 1.5em;
            color: #333;
            margin-bottom: 10px;
            margin-top: 5px;
        }
        .section p {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        .section ul {
            padding-left: 20px;
            list-style: disc;
        }
        .section ul li {
            margin-bottom: 10px;
        }
        .personal-info {
            display: flex;
            flex-direction: row;
        }
        .summary {
            width: 68%;
        }
        .links {
            margin-left: 10px;
            flex-grow: 1;
            padding: 5px;
            border: #4a90e2 2px dotted;
        }
        .links ul {
            margin: 5px 0;
        }
        .links h3 {
            margin: 0;
        }
        .links a {
            color: #4a90e2;
            text-decoration: none;
            font-weight: bold;
        }
        .details {
            display: flex;
        }
        .main-details {
            flex: 0 0 68%;
            width: 68%;
        }
        .side-details {
            margin-left: 20px;
            flex: 1;
        }
        .side-details .section div {
            font-size: small;
        }
        .projects .project,
        .experience .job,
        .education .school,
        .certifications .certification,
        .volunteer .volunteer-work,
        .languages .language {
            padding: 20px;
            background-color: #eff4fd;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            margin-bottom: 10px;
        }
        .projects .project p,
        .experience .job p,
        .education .school p,
        .certifications .certification p,
        .volunteer .volunteer-work p,
        .languages .language p {
            margin: 0;
        }
        .language {
            padding: 5px 10px !important;
        }
    `;
}

function experienceHTML(resumeData: ResumeData) {
    return `
        <div class="experience section">
            <h2>Work Experience</h2>
            <div id="workExperience">
                ${
                    resumeData.workExperience
                        ?.map(
                            (job) => `
                                <div class="job">
                                    <h3>${job.company}</h3>
                                    <p><strong>Position:</strong> ${job.position}</p>
                                    <p><strong>Dates:</strong> ${job.startDate} - ${job.endDate ?? 'Present'}</p>
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
        <div class="projects section">
            <h2>Projects</h2>
            <div id="projects">
                ${
                    resumeData.projects
                        ?.map(
                            (project) => `
                                <div class="project">
                                    <h3>${project.title}</h3>
                                    <p>${project.description}</p>
                                    <ul>
                                        ${project.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}
                                    </ul>
                                    ${project.website ? `<p><a href="${project.website}">Website</a></p>` : ''}
                                    ${project.sourceCodeLink ? `<p><a href="${project.sourceCodeLink}">Source Code</a></p>` : ''}
                                </div>
                                `
                        )
                        .join('') ?? ''
                }
            </div>
        </div>
    `;
}

function educationHTML(resumeData: ResumeData) {
    return `<div class="education section">
                            <h2>Education</h2>
                            <div id="education">
                                ${
                                    resumeData.education
                                        ?.map(
                                            (education) => `
                                <div class="school">
                                    <h3>${education.institution}</h3>
                                    <p><strong>Degree:</strong> ${education.degree}</p>
                                    <p><strong>Dates:</strong> ${education.startDate ?? ''} - ${education.endDate}</p>
                                </div>
                                `
                                        )
                                        .join('') ?? ''
                                }
                            </div>
                        </div>`;
}

function certificationsHTML(resumeData: ResumeData) {
    return `
        <div class="certifications section">
            <h2>Certifications</h2>
            <div id="certifications">
                ${
                    resumeData.certifications
                        ?.map(
                            (certification) => `
                                <div class="certification">
                                    <h3>${certification.name}</h3>
                                    <p>Date Acquired: ${certification.dateAquired}</p>
                                </div>
                                `
                        )
                        .join('') ?? ''
                }
            </div>
        </div>
    `;
}

function volunteerHTML(resumeData: ResumeData) {
    return `
        <div class="volunteer section">
            <h2>Volunteer Work</h2>
            <div id="volunteerWork">
                ${
                    resumeData.volunteerWork
                        ?.map(
                            (volunteer) => `
                                <div class="volunteer-work">
                                    <h3>${volunteer.name}</h3>
                                    <p><strong>Dates:</strong> ${volunteer.startDate} - ${volunteer.endDate ?? 'Present'}</p>
                                    <p>${volunteer.description ?? ''}</p>
                                </div>
                                `
                        )
                        .join('') ?? ''
                }
            </div>
        </div>
    `;
}

function languagesHTML(resumeData: ResumeData) {
    return `
        <div class="languages section">
            <h2>Languages</h2>
            <div id="languages">
                ${
                    resumeData.languages
                        ?.map(
                            (language) => `
                                <div class="language">
                                    <p><strong>${language.name}:</strong> ${language.proficiency}</p>
                                </div>
                                `
                        )
                        .join('') ?? ''
                }
            </div>
        </div>
    `;
}
