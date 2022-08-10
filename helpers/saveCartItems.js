const saveCartItems = () => {
  const list = document.querySelector('.cart__items');
  localStorage.setItem('carItems', list.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
