import { generate } from '../src/index';
import { testData } from './testData';

import { chromium } from 'playwright';

//TODO implement proper tests

async function testEdge() {
    const html = generate('edge', testData);

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
        height: `${contentHeight + 200}px`,
        margin: { bottom: '1cm', top: '1cm' },
        path: 'edge_example.pdf',
    });
    await browser.close();
}

testEdge().then(() => console.log('Generated PDF'));
