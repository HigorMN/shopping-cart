const fetchProducts = async () => {
  const endPoint = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
