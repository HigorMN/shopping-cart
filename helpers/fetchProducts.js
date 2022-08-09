const fetchEndPoint = (product) => fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${product}`,
);

const fetchProducts = async (product) => {
  const endPoint = await fetchEndPoint(product);
  if (!product) {
    return Promise.reject(new Error('You must provide an url'));
  }
  const dataAPI = await endPoint.json();
  return await dataAPI;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
