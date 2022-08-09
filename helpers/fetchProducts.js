const fetchEndPoint = (product) => fetch('https://api.mercadolibre.com/sites/MLB/search?q=${product}');

const fetchProducts = async (product) => {
  const endPoint = await fetchEndPoint(product)
  const result = await endPoint.json();
  console.log(result.results);
};

fetchProducts('computador')

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
