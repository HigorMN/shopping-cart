const list = document.querySelector('.cart__items');
const cart = document.querySelector('.cart__item')
const clear = document.querySelector('.empty-cart');
const count = document.querySelector('.total-price');

const clearInnerHTML = async () => {
  list.innerHTML = '';
  await saveCartItems('cartItems', list.innerHTML);
};

const btnClear = async () => {
  clear.addEventListener('click', clearInnerHTML);
  await countPrice();
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
  const items = document.querySelector('.items');

  const { id: sku, title: name, thumbnail: image } = item;
  const creat = createProductItemElement({ sku, name, image });

  items.appendChild(creat);
};

const getFetchProduto = async (product) => {
  const data = await fetchProducts(product);
  data.results.forEach((item) => createListProduto(item));
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = async (event) => {
  event.target.remove();
  await countPrice();
  await saveCartItems('cartItems', list.innerHTML);
};

const removeCartItemElement = async () => {
  const li = document.querySelectorAll('.cart__item');

  li.forEach((e) => e.addEventListener('click', cartItemClickListener));
  await countPrice();
  await saveCartItems('cartItems', list.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
};

const getButtonCardComplement = async (event) => {
  const items = document.querySelector('.cart__items');

  const item = event.target.parentNode;
  const takeId = getSkuFromProductItem(item);
  const results = await fetchItem(takeId);
  const { id: sku, title: name, price: salePrice } = results;
  const card = createCartItemElement({ sku, name, salePrice }); 
  
  items.appendChild(card);
  await countPrice();
  await saveCartItems('cartItems', list.innerHTML);
};

const getSavedCartItemsCostruct = async (key) => {
  list.innerHTML = await getSavedCartItems(key);
};

const getButtonCard = async () => {
  const addCard = await document.querySelectorAll('.item__add');
  addCard.forEach((button) => button.addEventListener('click', getButtonCardComplement));
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
  count.innerText = `Subtotal: R$ ${result.toFixed(2)}`
  console.log(result.toFixed(2));
}


window.onload = async () => { 
  await getFetchProduto('computador');
  await getButtonCard();
  await getSavedCartItemsCostruct('cartItems');
  await removeCartItemElement();
  await countPrice();
};
