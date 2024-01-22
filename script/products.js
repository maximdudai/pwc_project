'use strict'

export const saveProduct = (name, image, quantity) => {
  let products = JSON.parse(localStorage.getItem("products"));

  if(products == null)
    products = [];

  const existingProduct = products.find(product => product.name === name);

  if(existingProduct)
    existingProduct.quantity += quantity;
  else {
    let newProduct = {
      name: name,
      image: image,
      quantity: quantity
    };

    products.push(newProduct);
  }

  localStorage.setItem("products", JSON.stringify(products));
};

export const loadProducts = () => {
  let products = JSON.parse(localStorage.getItem("products"));

  if(products == null) {
    products = [];
  }

  return products;
}