const fetchEndPoint = (product) => fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${product}`,
);

const fetchProducts = async (product) => {
  try {
    const endPoint = await fetchEndPoint(product);
    const dataAPI = await endPoint.json();
    return await dataAPI;
  } catch (error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
