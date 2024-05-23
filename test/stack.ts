import { stack } from '../src/templates/stack';
import { generate } from '../src/index';
import { testData } from './testData';

//TODO implement proper tests

function testStack() {
    const html = generate(stack, testData);
    console.log(html);
}

testStack();
