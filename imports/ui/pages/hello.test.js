/* import hello from './hello';

test('returns hello', () => {
  console.log(hello());
  expect(hello()).toBe('Hola');
}); */

const sum = require('./hello.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
