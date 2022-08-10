const saveCartItems = (key, valor) => {
  localStorage.setItem(key, valor);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
