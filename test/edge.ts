import { testData } from './testData';

import { toPDF } from './toPdf';

//TODO implement proper tests

async function testEdge() {
    await toPDF('edge', testData);
}

testEdge().then(() => console.log('done'));
