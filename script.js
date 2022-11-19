const list = document.querySelector('.cart__items');
const items = document.querySelector('.items');
const clear = document.querySelector('.empty-cart');
const count = document.querySelector('.total-price');

const loadingAPI = () => {
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = 'Carregando...';
  items.appendChild(loading);
};

const loadingAPIRemove = () => {
  const loadingRemove = document.querySelector('.loading');
  loadingRemove.remove();
};

const countPrice = () => {
  const ulChildren = list.children;
  let result = 0;
  if (ulChildren.length > 0) {
    for (let index = 0; index < ulChildren.length; index += 1) {
      const indexString = ulChildren[index].innerText.indexOf('$') + 1;
      const number = ulChildren[index].innerText.substring(indexString);
      result += parseFloat(number);
    }
  }
  count.innerText = Math.round((result + Number.EPSILON) * 100) / 100;
};

const clearInnerHTML = () => {
  list.innerHTML = '';
  saveCartItems('cartItems', list.innerHTML);
  countPrice();
};

const btnClear = () => {
  clear.addEventListener('click', clearInnerHTML);
};

btnClear();

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const createListProduto = (item) => {
  const { id: sku, title: name, thumbnail: image } = item;
  const creat = createProductItemElement({ sku, name, image });

  items.appendChild(creat);
};

const getFetchProduto = async (product) => {
  loadingAPI();
  const data = await fetchProducts(product);
  loadingAPIRemove();
  data.results.forEach((item) => createListProduto(item));
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.parentNode.remove();
  countPrice();
  saveCartItems('cartItems', list.innerHTML);
};

const removeCartItemElement = () => {
  const li = document.querySelectorAll('.cart__item');

  li.forEach((e) => e.addEventListener('click', cartItemClickListener));
  countPrice();
  saveCartItems('cartItems', list.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice, thumbnail }) => {
  const images = document.createElement('img');
  const p = document.createElement('p');
  const li = document.createElement('li');

  images.src = thumbnail;
  li.className = 'cart__item';
  p.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(images);
  li.appendChild(p);
  li.addEventListener('click', cartItemClickListener);

  return li;
};

const getButtonCardComplement = async (event) => {
  const cartItems = document.querySelector('.cart__items');

  const item = event.target.parentNode;
  const takeId = getSkuFromProductItem(item);
  const results = await fetchItem(takeId);
  const { id: sku, title: name, price: salePrice, thumbnail } = results;
  const card = createCartItemElement({ sku, name, salePrice, thumbnail }); 
  
  cartItems.appendChild(card);
  countPrice();
  await saveCartItems('cartItems', list.innerHTML);
};

const getSavedCartItemsCostruct = async (key) => {
  list.innerHTML = await getSavedCartItems(key);
};

const getButtonCard = async () => {
  const addCard = await document.querySelectorAll('.item__add');
  addCard.forEach((button) => button.addEventListener('click', getButtonCardComplement));
};

window.onload = async () => { 
  await getFetchProduto('computador');
  await getButtonCard();
  await getSavedCartItemsCostruct('cartItems');
  removeCartItemElement();
  countPrice();
};
