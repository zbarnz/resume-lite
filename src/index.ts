import { ResumeData } from './resumeTypes';

//template functions:
import { edge } from './templates/edge';
import { stack } from './templates/stack';

// Define an enumeration or constant for available templates
export const AvailableTemplates = {
    STACK: 'stack',
    EDGE: 'edge',
} as const;

export type TemplateName = (typeof AvailableTemplates)[keyof typeof AvailableTemplates];
export type TemplateFunction = (resumeData: ResumeData) => string;

// Map template names to their respective functions
const templateFunctions: Record<TemplateName, TemplateFunction> = {
    stack: stack,
    edge: edge,
};

/**
 * Generates a resume using the specified template and resume data.
 *
 * Available template names:
 *
 *    - stack
 *    - edge
 *
 * @param {TemplateName} templateName - The name of the template to use.
 * @param {ResumeData} resumeData - The resume data to be used in the template.
 * @returns {string} The generated resume as a string.
 * @throws {Error} If the specified template name is not available.
 */
export function generate(templateName: TemplateName, resumeData: ResumeData): string {
    const templateFunction = templateFunctions[templateName];
    if (!templateFunction) {
        throw new Error(
            `Template ${templateName} is not available. Available templates: ${Object.values(AvailableTemplates).join(', ')}`
        );
    }
    return templateFunction(resumeData);
}

export {
    Accolade,
    Certification,
    Education,
    Language,
    Link,
    PersonalInfo,
    Project,
    ResumeData,
    VolunteerWork,
    WorkExperience,
} from './resumeTypes';

export default {
    generate,
};
