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

const getFetchProduto = async (product) => {
  const data = await fetchProducts(product);
  const { results } = data;
  results.forEach((elemento) => {
    const items = document.querySelector('.items');
    const { id: sku, title: name, thumbnail: image } = elemento;
    const creat = createProductItemElement({ sku, name, image });
    items.appendChild(creat);
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = async (event) => {
  event.target.remove();
  await saveCartItems();
};

const removeCartItemElement = async () => {
  const li = document.querySelectorAll('.cart__item');
  li.forEach((e) => e.addEventListener('click', cartItemClickListener));
  await saveCartItems();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getBtnCard = async (event) => {
  const items = document.querySelector('.cart__items');
  const item = event.target.parentNode;
  const takeId = getSkuFromProductItem(item);
  const results = await fetchItem(takeId);
  const { id: sku, title: name, price: salePrice } = results;
  const card = createCartItemElement({ sku, name, salePrice }); 
  items.appendChild(card);
  await saveCartItems();
};

const getButtonCard = async () => {
  const addCard = await document.querySelectorAll('.item__add');
  addCard.forEach((button) => button.addEventListener('click', getBtnCard));
};

window.onload = async () => { 
  await getFetchProduto('computador');
  await getButtonCard();
  await getSavedCartItems();
  await removeCartItemElement();
};
