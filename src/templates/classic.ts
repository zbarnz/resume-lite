import { ResumeData } from '../resumeTypes';

/**
 * Generates an HTML string for a complete resume for the "Classic" template
 * using provided resume data. The Classic template is a refined, single column
 * serif layout with a centered header, small caps section headings and
 * right aligned dates.
 *
 * @param {ResumeData} resumeData - The resume data containing personal information, skills, work experience, and projects.
 * @returns {string} The generated HTML string representing the resume.
 */
export function classic(resumeData: ResumeData): string {
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
                ${headerHTML(resumeData)}

                ${resumeData.personalInfo.summary ? summaryHTML(resumeData) : ''}

                ${resumeData.workExperience?.length ? experienceHTML(resumeData) : ''}

                ${resumeData.projects?.length ? projectsHTML(resumeData) : ''}

                ${resumeData.education?.length ? educationHTML(resumeData) : ''}

                ${resumeData.skills?.length ? skillsHTML(resumeData) : ''}

                ${resumeData.certifications?.length ? certificationsHTML(resumeData) : ''}

                ${resumeData.accolades?.length ? accoladesHTML(resumeData) : ''}

                ${resumeData.volunteerWork?.length ? volunteerHTML(resumeData) : ''}

                ${resumeData.languages?.length ? languagesHTML(resumeData) : ''}
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
            font-family: Georgia, 'Times New Roman', Times, serif;
            font-size: 10.5pt;
            line-height: 1.45;
            margin: 0;
            padding: 0;
            color: #222;
            background-color: #fff;
        }
        a {
            color: inherit;
            text-decoration: none;
        }
        .container {
            padding: 36px 48px;
            overflow: hidden;
        }
        .header {
            text-align: center;
            margin-bottom: 14px;
        }
        .header h1 {
            font-size: 26pt;
            font-weight: normal;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin: 0;
            color: #111;
        }
        .header .ornament {
            width: 60px;
            height: 2px;
            margin: 8px auto 10px;
            background-color: #7a1f2b;
        }
        .header .contact {
            font-size: 9.5pt;
            color: #555;
        }
        .header .contact span + span::before {
            content: '\\00B7';
            margin: 0 0.6em 0 0.35em;
            color: #7a1f2b;
        }
        .summary {
            text-align: center;
            font-style: italic;
            color: #444;
            margin: 0 auto 6px;
            max-width: 90%;
        }
        .section {
            margin-top: 14px;
        }
        .section h2 {
            font-size: 10pt;
            font-weight: bold;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #7a1f2b;
            margin: 0 0 6px;
            padding-bottom: 3px;
            border-bottom: 1px solid #c9b8ba;
        }
        .entry {
            margin-bottom: 9px;
            page-break-inside: avoid;
        }
        .entry:last-child {
            margin-bottom: 0;
        }
        .entry-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        .entry-title {
            font-weight: bold;
            color: #111;
        }
        .entry-subtitle {
            font-style: italic;
            color: #444;
        }
        .entry-date {
            font-size: 9.5pt;
            color: #666;
            white-space: nowrap;
            padding-left: 1em;
        }
        .entry ul {
            margin: 3px 0 0;
            padding-left: 1.3em;
        }
        .entry li {
            margin-bottom: 1px;
        }
        .entry li::marker {
            color: #7a1f2b;
        }
        .project-links {
            font-size: 9pt;
            color: #7a1f2b;
            white-space: nowrap;
            padding-left: 1em;
        }
        .project-links a + a::before {
            content: '|';
            margin: 0 0.5em;
            color: #c9b8ba;
        }
        .inline-list {
            margin: 0;
        }
        .header .contact span,
        .inline-list span {
            white-space: nowrap;
        }
        .inline-list span + span::before {
            content: '\\2022';
            margin: 0 0.6em 0 0.35em;
            color: #7a1f2b;
        }
    `;
}

function headerHTML(resumeData: ResumeData) {
    const { name, email, phone, address, links } = resumeData.personalInfo;

    const contactItems = [
        address ? `<span>${address}</span>` : '',
        phone ? `<span>${phone}</span>` : '',
        `<span><a href="mailto:${email}">${email}</a></span>`,
        ...(links ?? []).map(
            (link) =>
                `<span><a href="${link.url}">${link.hideLink ? link.name : link.url.replace(/^https?:\/\//, '')}</a></span>`
        ),
    ];

    return `
        <div class="header">
            <h1 id="name">${name}</h1>
            <div class="ornament"></div>
            <div class="contact">${contactItems.join(' ')}</div>
        </div>
    `;
}

function summaryHTML(resumeData: ResumeData) {
    return `<p class="summary">${resumeData.personalInfo.summary}</p>`;
}

function experienceHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Experience</h2>
            ${
                resumeData.workExperience
                    ?.map(
                        (job) => `
                            <div class="entry">
                                <div class="entry-row">
                                    <span class="entry-title">${job.company}</span>
                                    <span class="entry-date">${job.startDate} &ndash; ${job.endDate ?? 'Present'}</span>
                                </div>
                                <div class="entry-subtitle">${job.position}</div>
                                <ul>
                                    ${job.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}
                                </ul>
                            </div>
                            `
                    )
                    .join('') ?? ''
            }
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
                                    `<a href="${link!.url}">${link!.hideLink ? link!.name : link!.url.replace(/^https?:\/\//, '')}</a>`
                            )
                            .join('');

                        return `
                            <div class="entry">
                                <div class="entry-row">
                                    <span class="entry-title">${project.title}</span>
                                    ${links ? `<span class="project-links">${links}</span>` : ''}
                                </div>
                                <div class="entry-subtitle">${project.description}</div>
                                <ul>
                                    ${project.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}
                                </ul>
                            </div>
                            `;
                    })
                    .join('') ?? ''
            }
        </div>
    `;
}

function educationHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Education</h2>
            ${
                resumeData.education
                    ?.map(
                        (education) => `
                            <div class="entry">
                                <div class="entry-row">
                                    <span class="entry-title">${education.institution}</span>
                                    ${education.startDate || education.endDate ? `<span class="entry-date">${education.startDate ? education.startDate + (education.endDate ? ' &ndash; ' : '') : ''}${education.endDate ?? ''}</span>` : ''}
                                </div>
                                <div class="entry-subtitle">${education.degree}${education.gpa ? `, GPA ${education.gpa}` : ''}</div>
                            </div>
                            `
                    )
                    .join('') ?? ''
            }
        </div>
    `;
}

function skillsHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Skills</h2>
            <p class="inline-list">
                ${resumeData.skills?.map((skill) => `<span>${skill}</span>`).join(' ') ?? ''}
            </p>
        </div>
    `;
}

function certificationsHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Certifications</h2>
            ${
                resumeData.certifications
                    ?.map(
                        (certification) => `
                            <div class="entry entry-row">
                                <span class="entry-title">${certification.name}</span>
                                ${certification.dateAquired ? `<span class="entry-date">${certification.dateAquired}</span>` : ''}
                            </div>
                            `
                    )
                    .join('') ?? ''
            }
        </div>
    `;
}

function accoladesHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Honors &amp; Awards</h2>
            ${
                resumeData.accolades
                    ?.map(
                        (accolade) => `
                            <div class="entry">
                                <div class="entry-row">
                                    <span class="entry-title">${accolade.name}</span>
                                    ${accolade.dateAquired ? `<span class="entry-date">${accolade.dateAquired}</span>` : ''}
                                </div>
                                ${accolade.description ? `<div class="entry-subtitle">${accolade.description}</div>` : ''}
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
                            <div class="entry">
                                <div class="entry-row">
                                    <span class="entry-title">${volunteer.name}</span>
                                    <span class="entry-date">${volunteer.startDate} &ndash; ${volunteer.endDate ?? 'Present'}</span>
                                </div>
                                ${volunteer.description ? `<div class="entry-subtitle">${volunteer.description}</div>` : ''}
                            </div>
                            `
                    )
                    .join('') ?? ''
            }
        </div>
    `;
}

function languagesHTML(resumeData: ResumeData) {
    return `
        <div class="section">
            <h2>Languages</h2>
            <p class="inline-list">
                ${resumeData.languages?.map((language) => `<span><strong>${language.name}</strong> (${language.proficiency})</span>`).join(' ') ?? ''}
            </p>
        </div>
    `;
}
