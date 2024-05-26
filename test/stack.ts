import { generate } from '../src/index';
import { testData } from './testData';

import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';
import fs from 'fs';

//TODO implement proper tests

async function testStack() {
    const html = generate('stack', testData);

    try {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();

        // Set the data of the resume to be printed in the browser's session storage
        const numberPages = 1;

        await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 0 });

        const pagesBuffer: Buffer[] = [];

        const processPage = async (index: number) => {
            const pageElement = await page.$(`.container`);
            // eslint-disable-next-line unicorn/no-await-expression-member
            const width = (await (await pageElement?.getProperty('scrollWidth'))?.jsonValue()) ?? 0;
            // eslint-disable-next-line unicorn/no-await-expression-member
            const height =
                (await (await pageElement?.getProperty('scrollHeight'))?.jsonValue()) ?? 0;

            const temporaryHtml = await page.evaluate((element) => {
                if (element) {
                    const clonedElement = element.cloneNode(true) as HTMLDivElement;
                    const temporaryHtml_ = document.body.innerHTML;
                    document.body.innerHTML = clonedElement.outerHTML;
                    return temporaryHtml_;
                } else {
                    throw new Error('cant find container class');
                }
            }, pageElement);

            pagesBuffer.push(await page.pdf({ width, height, printBackground: true, timeout: 0 }));

            await page.evaluate((temporaryHtml_: string) => {
                document.body.innerHTML = temporaryHtml_;
            }, temporaryHtml);
        };

        // Loop through all the pages and print them, by first displaying them, printing the PDF and then hiding them back
        for (let index = 1; index <= numberPages; index++) {
            await processPage(index);
        }

        // Using 'pdf-lib', merge all the pages from their buffers into a single PDF
        const pdf = await PDFDocument.create();

        for (const element of pagesBuffer) {
            const page = await PDFDocument.load(element);
            const [copiedPage] = await pdf.copyPages(page, [0]);
            pdf.addPage(copiedPage);
        }

        // Save the PDF to storage and return the URL to download the resume
        // Store the URL in cache for future requests, under the previously generated hash digest
        const buffer = Buffer.from(await pdf.save());

        fs.writeFileSync('stack_test.pdf', buffer);

        // Close all the pages and disconnect from the browser
        await page.close();
        await browser.close();
    } catch (error) {
        throw new Error(error as any);
    }
}

testStack().then(() => console.log('Generated PDF'));
