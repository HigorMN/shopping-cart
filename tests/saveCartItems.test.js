const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const { price } = require('../mocks/item');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;', async () => {
    expect.assertions(1);
    await saveCartItems('key', '<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  test('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro \'cartItems\' e o segundo sendo o valor passado como argumento para saveCartItems.', async () => {
    expect.assertions(1);
    await saveCartItems('cartItems', '<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })

});
