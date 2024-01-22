'use strict'

export const saveProduct = (name, image, quantity) => {
  let products = JSON.parse(localStorage.getItem("products"));

  if (products == null) {
      products = [];
  }

  let product = {
      name: name,
      image: image,
      quantity: quantity
  }

  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));
}

export const loadProducts = () => {
  let products = JSON.parse(localStorage.getItem("products"));

  if (products == null) {
      products = [];
  }

  return products;
}