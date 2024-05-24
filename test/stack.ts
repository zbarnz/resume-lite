import { generate } from '../src/index';
import { testData } from './testData';

import { chromium } from 'playwright';
import fs from 'fs';
//TODO implement proper tests

async function testStack() {
    const html = generate('stack', testData);

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.setContent(html, {
        waitUntil: 'networkidle', // wait for page to load completely
    });

    const contentHeight = await page.evaluate(() => {
        return document.documentElement.scrollHeight;
    });

    await page.pdf({
        width: '210mm', // A4 width in mm
        height: `${contentHeight}px`,
        margin: { bottom: '1cm', top: '1cm' },
        path: 'stack_example.pdf',
    });
    await browser.close();
}

testStack().then(() => console.log('Generated PDF'));
