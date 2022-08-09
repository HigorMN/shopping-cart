require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Teste se fetchItem é uma função;', () => {
    expect(typeof fetchItem).toBe('function');
  })

  test('Execute a função fetchItem com o argumento \'MLB1615760527\' e teste se fetch foi chamada;', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test('Teste se, ao chamar a função fetchItem com o argumento do item \'MLB1615760527\', a função fetch utiliza o endpoint', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toBeCalledWith(endpoint);
  })

  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    expect.assertions(1);
    const objeto = await fetchItem('computador');
    expect(objeto).toEqual(item);
  })
});
