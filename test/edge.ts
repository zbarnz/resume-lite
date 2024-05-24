import { edge } from '../src/templates/edge';
import { generate } from '../src/index';
import { testData } from './testData';

//TODO implement proper tests

function testStack() {
    const html = generate(edge, testData);
    console.log(html);
}

testStack();
