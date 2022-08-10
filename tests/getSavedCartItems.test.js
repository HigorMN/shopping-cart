const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', async () => {
    expect.assertions(1);
    await getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  test('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o \'cartItems\' como parâmetro.', async () => {
    expect.assertions(1);
    await getSavedCartItems('getItem');
    expect(localStorage.getItem).toHaveBeenCalledWith('getItem');
  })
});
