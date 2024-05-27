import { testData } from './testData';

import { toPDF } from './toPdf';

//TODO implement proper tests

async function testStack() {
    await toPDF('stack', testData);
}

testStack().then(() => console.log('done'));
