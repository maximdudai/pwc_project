'use strict'

import { saveProduct } from './products.js';

const cardTemplate = $('.itemCard');

//create card
const createCard = (index, imageUrl, productName, originalPrice, currentPrice) => {
    const card = cardTemplate.clone();

    card.attr('id', index); // Set id for the main div
    card.find('.itemCard').attr('card-', ''); // Clear id for nested .itemCard if needed
    card.find('.lojaCardBanner').attr('src', imageUrl);
    card.find('.animalNameContent').text(productName);
    card.find('.reducedPrice').text(originalPrice + "€");
    card.find('.currentPrice').text(currentPrice + "€");

    return card;
}

const loadItems = (data) => {
    const cardContainer = $('.card-container');
    cardContainer.empty(); // Clear existing items
    let card_index = 1;

    data.forEach(function (item) {
        const cardDiv = createCard(card_index, item.imageUrl, item.productName, item.originalPrice, item.currentPrice);
        cardContainer.append(cardDiv);
        card_index++;
    });
}

const fetchProducts = () => {
    $('.card-container').empty();

    let allProducts;
    $.ajax({
        url: '../data/shopItems.json',
        dataType: 'json',
        success: function (data) {
            allProducts = data.products;
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }

    }).done(function () {
        loadItems(allProducts);

    }).fail(function (err) {
        console.log(err);
    });
}

$(document).ready(() => {
    fetchProducts();
});


// PAGE LOADING
$(document).ready(function () {
    let allProducts;
    $.ajax({
        url: '../data/shopItems.json',
        dataType: 'json',
        success: function (data) {
            allProducts = data.products;
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }

    }).fail(function (err) {
        console.log(err);
    });

    $('#productQuantity').on('keypress', function (e) {
        onlyNumbers(e);
    });

    $('#filterItems').on('click', function () {
        const selectedCategory = $('#productType').val();
        let filteredProducts;

        if (selectedCategory == 0)
            filteredProducts = allProducts;
        else
            filteredProducts = allProducts.filter(item => item.category === selectedCategory);

        loadItems(filteredProducts);
    });
    $('.card-container').on('click', '.comprarItems', function() {
        const item = $(this).closest('.card');

        const itemQuantity = item.find('#productQuantity');
        const itemName = item.find('.animalNameContent').text();
        const itemImage = item.find('.lojaCardBanner').src;

        const quantity = itemQuantity.val();
        itemQuantity.val(''); 

        saveProduct(itemName, itemImage, quantity);
    });

});


function onlyNumbers(key) {
    let charCode = key.charCode ? key.charCode : key.keyCode;

    alert("asadas");

    // 8 = backspace
    // 48-57 = 0-9

    if (charCode != 8 && (charCode < 48 || charCode > 57)) {
        key.preventDefault();
    }
}