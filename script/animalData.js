'use strict'
const animalCard = $('.animalCard');

const API_LINK = "https://api.petfinder.com/v2/animals";
const apiConfig = {
  API_LINK: "https://api.petfinder.com/v2/animals",
  Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmUURFVmZScGtsS3JteDZMOTZUN3EwcWpuYUxXQ0hZd0dyTmxXOWt4VlFRQUlnS1NKZiIsImp0aSI6ImYwMTk5OTBlNWNjMzA3ZjI4NjQyNzQ1MWRkZDgxZTA3OGJiZjk3ZWM1NmM2MDc2MDJlN2I3NGE4ZDNhMmZmMGQ2ZGM1NDk5YTQ3Mzc4ZTg5IiwiaWF0IjoxNzA1OTUyMzUzLCJuYmYiOjE3MDU5NTIzNTMsImV4cCI6MTcwNTk1NTk1Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.q3gGUx3xET-S_Dm9gou65p-wuQt-PBJAX6ycVszEekw-QQZ9ZSoStHoum6QVTGOFh5PMro17E6IE0HYRVu5tu6uESbB9OE0dI2fV5SCueey28wDZOwCwan8bvRqvHUE8AfsldRSDODruA9pjrkyyBEIUakra4jsT8bIeRFYZj0NBu5emBEEPFccET4ebEv0044Zafk62alVqeatlvhpPLHcQKz6qW6qS4pkyB6pzM9Ct98_KFWXp9NkyQCb76-EmwBKi4vAftsDUAGVS46la3FX-kNLH7x1votu2GXjMMZ4ICyHXQoUV6KVqt8vxULSiPdTqb2CaQWmWsYYl9U5Maw",
  limitData: 10
}

const createAnimalCard = (index, photos, name, age) => {
  const card = animalCard?.clone();
  const Poster = photos[0]?.small || "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";


  $(card).find('.maisDetalhes').prop('id', index);

  $(card).find('.card-img-top').attr('src', Poster);
  $(card).find('.animalNameContent').text(name);
  $(card).find('.animalAgeContent').text(age);

  return card;
};


const loadAnimalsContainer = (data) => {
  const cardContainer = $('#availableAnimals');
  cardContainer.empty();
  let cardDiv;

  $.each(data, function (_, value) {
    cardDiv = createAnimalCard(value?.id, value?.photos, value?.name, value?.age);
    cardContainer.append(cardDiv);
  });
};

const loadAnimalsData = () => {
  $('#availableAnimals').empty();

  let loadedAnimals;
  $.ajax({
    url: apiConfig.API_LINK + '?limit=' + apiConfig.limitData,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + apiConfig.Authorization,
    },
    success: function (data) {
      loadedAnimals = data.animals;
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

  const attributos = data?.attributes || [];

  const description = data?.description || "Sem descrição";
  const gender = data?.gender || "Sem gênero";
  const size = data?.size || "Sem tamanho";
  const status = data?.status || "Sem status";
  const url = data?.url || "Sem url";


  const attributosLista = modal.find('.animalAttributos');

  if (attributos.length > 0) {
    $.each(attributos, function (key, value) {
      const listItem = $('<li></li>');
      listItem.text(`${key}: ${value === null ? 'N/A' : !value ? 'Não' : 'Sim'}`);
      attributosLista.append(listItem);
    });
  }


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

const filterAnimals = () => {

  let coatString = '';
  let ageString = '';
  let genderString = '';

  let loadedAnimal = [];


  const coatData = $('#coatData').val();
  const ageData = $('#ageData').val();
  const genderData = $('#genderData').val();

  if (coatData) {
    coatString += `coat=${coatData || null}`;
  }
  if (ageData) {
    ageString += `age=${ageData || null}`;
  }
  if (genderData) {
    genderString += `gender=${genderData || null}`;
  }

  $.ajax({
    url: apiConfig.API_LINK + '?' + coatString + '&' + ageString + '&' + genderString + '&limit=' + apiConfig.limitData,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + apiConfig.Authorization,
    },
    success: function (data) {
      loadedAnimal = data.animals;
      loadAnimalsContainer(loadedAnimal);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  }).fail(function (err) {
    console.log(err);
  });

};

$(document).ready(() => {
  $('#filterAnimals').on('click', () => filterAnimals());
});