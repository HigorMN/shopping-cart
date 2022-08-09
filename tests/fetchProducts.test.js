require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Teste se fetchProducts é uma função;', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  test('Execute a função fetchProducts com o argumento \'computador\' e teste se fetch foi chamada;', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })

  test('Teste se, ao chamar a função fetchProducts com o argumento \'computador\', a função fetch utiliza o endpoint', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toBeCalledWith(endpoint)
  })
});
