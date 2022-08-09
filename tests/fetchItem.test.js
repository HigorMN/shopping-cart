require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Teste se fetchProducts é uma função;', () => {
    expect(typeof fetchItem).toBe('function');
  })
});
