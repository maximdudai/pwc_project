'use strict'
const animalCard = $('.animalCard');

const API_LINK = "https://api.petfinder.com/v2/animals";
const apiConfig = {
  API_LINK: "https://api.petfinder.com/v2/animals",
  Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJXQkhVc2RwcG4yaFg2enMxN3ZRa01Jb2w5OFlJeEhXSVhlVDFKbjY1VEE1U0tkNWYxZyIsImp0aSI6IjIyMzM0MjEzMWM1MDQzNTZjNTQwMTA5ZTQ4MGEwYTBkY2YyOGE1MjE5YzcyYmY3MDM4NzYwNjIzMTdhYjBlYWEwODRhZjhiZDJmNDI3OTlhIiwiaWF0IjoxNzA1OTQ5MjY5LCJuYmYiOjE3MDU5NDkyNjksImV4cCI6MTcwNTk1Mjg2OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Vaam4AfGz2Vlfc_rdUTSlbtp-oZVY8uR3HxoqUYnH8izJQWuar4XPFUk0Q5VkJpwGcZuThNaP9T_2_-e2QIq4gX-IUy_tn_3M11bLTtm-XU3NqFDPPg5XLAEog0-U5zmOuKLkmNPJNM2wMaLDSaZpiiMI-QSjxbI8BLLKYFA4zFFjzigD92Qcq8OW_b3aExYdvMtyvyZqNyG58gUAG-IvPMQsomrDKoHKj4jkv-oCC4600cTU7iAMm6JCAyx0uWcNigZ_pKbmOxPxyKxa4Mj1tZSxudNKEj-CV2IBWN8IuWtGzOZF1dlc0exqVCqb08ParIGDojxpugzshId6a2iXg",
  limitData: 10
}

const createAnimalCard = (index, photos, name, age) => {
  const card = animalCard?.clone();
  const Poster = photos[0]?.small || "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";

  console.log(index, photos, name, age);

  $(card).find('.maisDetalhes').prop('id', index);

  $(card).find('.card-img-top').attr('src', Poster);
  $(card).find('.animalNameContent').text(name);
  $(card).find('.animalAgeContent').text(age);

  return card;
};


const loadAnimalsContainer = (data) => {
  const cardContainer = $('#availableAnimails');
  let cardDiv;

  $.each(data, function (_, value) {
    cardDiv = createAnimalCard(value?.id, value?.photos, value?.name, value?.age);
    cardContainer.append(cardDiv);
  });
};

const loadAnimalsData = () => {
  $('#availableAnimails').empty();

  let loadedAnimals;
  $.ajax({
    url: apiConfig.API_LINK + '?limit=' + apiConfig.limitData,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + apiConfig.Authorization,
    },
    success: function (data) {
      loadedAnimals = data.animals;
      console.log(loadedAnimals);
      loadAnimalsContainer(loadedAnimals);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  }).fail(function (err) {
    console.log(err);
  });
};

$(document).ready(() => {
  loadAnimalsData();

});

const showAnimalData = (data) => {
  const modal = $('.modal-body');

  // modal.find('.detalhesSobreAnimal').empty();

  const name = data?.name || "Sem nome";
  const age = data?.age || "Sem idade";
  const attributos = data?.attributes || "Sem atributos";
  const description = data?.description || "Sem descrição";
  const gender = data?.gender || "Sem gênero";
  const size = data?.size || "Sem tamanho";
  const status = data?.status || "Sem status";
  const url = data?.url || "Sem url";


  const attributosLista = modal.find('.animalAttributos');
  $.each(attributos, function (key, value) {
    const listItem = $('<li></li>');
    listItem.text(`${key}: ${value === null ? 'N/A' : !value ? 'Não' : 'Sim'}`);
    attributosLista.append(listItem);
  });

  modal.find('.animalName').text(name);
  modal.find('.animalAge').text(age);
  modal.find('.animalDescription').text(description);
  modal.find('.animalGender').text(gender);
  modal.find('.animalSize').text(size);
  modal.find('.animalStatus').text(status);

  modal.find('.animalLink').text('LINK');
  modal.find('.animalLink').attr('href', url);
}
const getAnimalData = (id) => {
  let loadedAnimal;

  $.ajax({
    url: apiConfig.API_LINK + '/' + id,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + apiConfig.Authorization,
    },
    success: function (data) {
      loadedAnimal = data.animal;
      showAnimalData(loadedAnimal);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  }).fail(function (err) {
    console.log(err);
  });

}