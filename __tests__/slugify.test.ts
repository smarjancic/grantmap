import { slugify } from '../lib/slugify';

function expectEqual(actual: string, expected: string) {
  if (actual !== expected) {
    throw new Error(`Expected "${expected}", got "${actual}"`);
  }
}

expectEqual(slugify('hello'), 'hello');
expectEqual(slugify('Hello World'), 'hello-world');
expectEqual(slugify('Hello, World!'), 'hello-world');

console.log('All tests passed!');
