import puppeteer from 'puppeteer';
import fs from 'fs';

import resume, { ResumeData, Link } from 'resume-lite';

import { TemplateName } from '../src/index';

//TODO implement proper tests

export async function toPDF(template: TemplateName, testData: ResumeData, pages?: number) {
    //test generate call
    const html = resume.generate(template, testData);

    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 0 });

        const height = await page.evaluate(() => document.documentElement.scrollHeight);

        const buffer = await page.pdf({
            width: '8.27in', // A4 width in inches
            height,
            printBackground: true,
        });

        const outputDir = 'test_output';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(`${outputDir}/${template}_test.pdf`, buffer);

        // Close all the pages and disconnect from the browser
        await page.close();
        await browser.close();
    } catch (error) {
        throw new Error(error as any);
    }
}
