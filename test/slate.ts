import { testData } from './testData';

import { toPDF } from './toPdf';

//TODO implement proper tests

async function testSlate() {
    await toPDF('slate', testData);
}

testSlate().then(() => console.log('done'));
