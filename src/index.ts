import { ResumeData } from './resumeTypes';

//template functions:
import { stack } from './templates/stack';

type TemplateFunction = (resumeData: ResumeData) => string;

export function generate(template: TemplateFunction, resumeData: ResumeData): string {
    return template(resumeData);
}
