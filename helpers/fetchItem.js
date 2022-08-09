const fetchTake = (product) => fetch(
  `https://api.mercadolibre.com/items/${product}`,
);

const fetchItem = async (product) => {
  try {
    const endPoint = await fetchTake(product);
    const dataAPI = await endPoint.json();
    return await dataAPI;
  } catch (error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
