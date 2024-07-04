import { ResumeData } from '../resumeTypes';

/**
 * Generates an HTML string for a complete resume for the "Stack" template
 * using provided resume data. The Stack template presents all sections
 * in a vertical layout.
 *
 * @param {ResumeData} resumeData - The resume data containing personal information, skills, work experience, and projects.
 * @returns {string} The generated HTML string representing the resume.
 */
export function stack(resumeData: ResumeData): string {
    return `
        <!doctype html>
        <html>
            <head>
                <title>${resumeData.personalInfo.name}</title>
            </head>
            <body style="margin: 0; line-height: 1.6; font-size: small;">
                <div id="templateContainer" style="padding: 20px 10px; overflow: hidden">
                    ${headerHTML(resumeData)}
                    ${resumeData.skills?.length ? skillsHtml(resumeData) : ''}
                    ${resumeData.workExperience?.length ? workExperienceHTML(resumeData) : ''}
                    ${resumeData.projects?.length ? projectsHTML(resumeData) : ''}
                    ${resumeData.education?.length ? educationHTML(resumeData) : ''}
                    ${resumeData.certifications?.length ? certificationsHTML(resumeData) : ''}
                    ${resumeData.accolades?.length ? accoladesHTML(resumeData) : ''}
                    ${resumeData.languages?.length ? languagesHTML(resumeData) : ''}
                    ${resumeData.volunteerWork?.length ? volunteerWorkHTML(resumeData) : ''}
                </div>
            </body>
        </html>
    `;
}

function headerHTML(resumeData: ResumeData): string {
    const linksHtml = resumeData.personalInfo.links?.length
        ? `
      <td valign="top" style="padding-left: 2em;">
        <strong>Websites:</strong>
        <br />
        ${resumeData.personalInfo.links.map((link) => `<a href="${link.url}" target="_blank">${link.url}</a><br />`).join('')}
      </td>
    `
        : '';

    return `
    <h1 style="border-bottom: 1px rgba(0, 0, 0, 0.24) solid; margin: 0;">
      ${resumeData.personalInfo.name}
    </h1>
    <p style="border-bottom: 1px rgba(0, 0, 0, 0.24) solid; padding-bottom: 1em;">
      ${resumeData.personalInfo.summary}
    </p>
    <table>
      <tr>
        <td valign="top">
          <strong>Personal Info:</strong>
          <br />
          ${resumeData.personalInfo.address}
          <br />
          <a href="mailto:${resumeData.personalInfo.email}">${resumeData.personalInfo.email}</a>
          ${resumeData.personalInfo.phone ? `<br />${resumeData.personalInfo.phone}` : ''}
        </td>
        ${resumeData.personalInfo.links?.length ? linksHtml : ''}
      </tr>
    </table>
  `;
}

function skillsHtml(resumeData: ResumeData): string {
    const skillsString = (resumeData.skills && resumeData.skills.slice(0, 20).join(', ')) ?? null;

    return `<h2
          style="margin-top: 0; margin-bottom: .5em; padding-bottom: 0; border-bottom: 1px rgba(0, 0, 0, 0.24) solid;"
        >
          Skills
        </h2>
        <p
          style="font-size: 0.9rem; padding-left: 2em; margin-bottom: 0; margin-top: 0.2em; color: #696969; -webkit-print-color-adjust: exact; print-color-adjust: exact"
        >
          <b>${skillsString}</b>
        </p>`;
}

function workExperienceHTML(resumeData: ResumeData): string {
    const workExperienceHTML = resumeData.workExperience
        ?.map((job) => {
            return `
      <h3 style="margin: 0;">
        ${job.company} (${job.startDate} to ${job.endDate ? job.endDate : 'Present'}) - ${job.position}
      </h3>
      <ul style="margin: 0.2em;">
        ${job.responsibilities.map((resp) => `<li>${resp}</li>`).join('')}
      </ul>`;
        })
        .join('');

    return `
    <h2 style="margin-top: 0; margin-bottom: .3em; padding-bottom: 0; border-bottom: 1px rgba(0, 0, 0, 0.24) solid;">
      Work Experience
    </h2>
    ${workExperienceHTML}`;
}

function projectsHTML(resumeData: ResumeData): string {
    const projectsHTML = resumeData.projects
        ?.map((project) => {
            const links =
                project.sourceCodeLink ||
                (project.website
                    ? `<li>
          ${project.sourceCodeLink ? `<li>GitHub: <a href="${project.sourceCodeLink}" target="_blank">${project.sourceCodeLink}</a> | ` : ''}
          ${project.website ? `Live Site: <a href="${project.website}" target="_blank">${project.website}</a>` : ''}
          </li>`
                    : '');

            return `
      <p style="margin: 0;">
        <b>${project.title}:</b> ${project.description}
      </p>
      <ul style="margin: 0.2em;">
        ${project.responsibilities.map((resp) => `<li>${resp}</li>`).join('')}
        ${links}
      </ul>`;
        })
        .join('');

    return `
    <h2 style="margin-top: 0; margin-bottom: .3em; padding-bottom: 0; border-bottom: 1px rgba(0, 0, 0, 0.24) solid;">
      Projects
    </h2>
    ${projectsHTML}`;
}

function languagesHTML(resumeData: ResumeData): string {
    const languages = resumeData.languages
        ?.map((language) => {
            return `<li><b>${language.name}</b> (${language.proficiency})</li>`;
        })
        .join('');

    return `
    <h3 style="margin-top: 0; margin-bottom: .5em; padding-bottom: 0; border-bottom: 1px rgba(0, 0, 0, 0.24) solid;">Languages</h3>
    <ul style="margin: 0.2em;">
        ${languages}
    </ul>`;
}

function educationHTML(resumeData: ResumeData): string {
    const education = resumeData.education
        ?.map((education) => {
            return `
      <li>
        <b>${education.degree}:&nbsp</b>
        ${education.institution}&nbsp(${education.startDate ? education.startDate + '&nbspto&nbsp' : ''}${education.endDate})
      </li>
    `;
        })
        .join('');

    return `
    <h3 style="margin-top: 0; margin-bottom: .5em; padding-bottom: 0; border-bottom: 1px rgba(0, 0, 0, 0.24) solid;">Education</h3>
    <ul style="margin: 0.2em;">
        ${education}
    </ul>`;
}

function certificationsHTML(resumeData: ResumeData): string {
    const certifications = resumeData.certifications
        ?.map((certification) => {
            return `<li><b>${certification.name}</b> (${certification.dateAquired})</li>`;
        })
        .join('');

    return `
    <h3 style="margin-top: 0; margin-bottom: .5em; padding-bottom: 0; border-bottom: 1px rgba(0, 0, 0, 0.24) solid;">Certifications</h3>
    <ul style="margin: 0.2em;">
        ${certifications}
    </ul>`;
}

function volunteerWorkHTML(resumeData: ResumeData): string {
    const volunteerWorkHTML = resumeData.volunteerWork
        ?.map((volunteer) => {
            return `
                <p style="margin: 0;">
                    <b>
                        ${volunteer.name} (${volunteer.startDate}${volunteer.endDate ? ` to ` + volunteer.endDate : ''})
                    </b>
                </p>
                <ul style="margin: 0.2em;">
                    <li>${volunteer.description}</li>
                </ul>
            `;
        })
        .join('');

    return `
    <h3 style="margin-top: 0; margin-bottom: .3em; padding-bottom: 0; border-bottom: 1px rgba(0, 0, 0, 0.24) solid;">
      Volunteer Work
    </h3>
    ${volunteerWorkHTML}`;
}

function accoladesHTML(resumeData: ResumeData): string {
    const accolades = resumeData.accolades
        ?.map((accolade) => {
            return `
      <li>
        <b>${accolade.name}${accolade.dateAquired ? ` (${accolade.dateAquired})` : ''}</b>${accolade.description ? `: ${accolade.description}` : ''}
      </li>
    `;
        })
        .join('');

    return `
    <h3 style="margin-top: 0; margin-bottom: .5em; padding-bottom: 0; border-bottom: 1px rgba(0, 0, 0, 0.24) solid;">Accolades</h3>
    <ul style="margin: 0.2em;">
        ${accolades}
    </ul>`;
}
