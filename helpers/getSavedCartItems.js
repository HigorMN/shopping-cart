const getSavedCartItems = () => {
  const list = document.querySelector('.cart__items');
  list.innerHTML = localStorage.getItem('carItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
