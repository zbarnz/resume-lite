import { testData } from './testData';

import { toPDF } from './toPdf';

//TODO implement proper tests

async function testClassic() {
    await toPDF('classic', testData);
}

testClassic().then(() => console.log('done'));
