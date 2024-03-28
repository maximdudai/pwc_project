'use strict'
const animalCard = $('.animalCard');

const API_LINK = "https://api.petfinder.com/v2/animals";
let api_key = "eyJ0eaXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmUURFVmZScGtsS3JteDZMOTZUN3EwcWpuYUxXQ0hZd0dyTmxXOWt4VlFRQUlnS1NKZiIsImp0aSI6IjJkODgwOGFiMmU2YTE2NjBlMWE0MWE0NmZjNWJkNzI2M2MwN2RhNmRiOWYzMjIxMzc4OTZiZjIyMjE3OGU0NDc2OTQzNjEyMzkzYjM2MjNiIiwiaWF0IjoxNzExNjY4NTI5LCJuYmYiOjE3MTE2Njg1MjksImV4cCI6MTcxMTY3MjEyOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.EaekLCsy__mJy35Xa7ucm0uCMWajFS1mOS1Uc5v2VKFiuKFzRgWrljD2z7_kSw_lee1TsgQZnO0QYkYdydWjJmjR2mgqi2ooVkTgPKfs11I538UULtCi1Oe7ttS1s6PDrr-dNi0uM9vseBaqvtWk3-pyPPuErT9yRLnR3ZNweuXptlBInMPs5DXiwRFeG5X2Ajwe9iMUQJzBbCxrY5MLbTJ4QU8H-MdRxU4uNHt4S_AfPzuyntAGsm5BuHuZVNsZtHMiiTaOJnC3Zl1K80X3E_Pa5Z6obER-z3gJNyJtxMUIniJvbXN_jlP24raLp-TjxNqHzslAwRg7j3hdoX9bVA"; 

let apiConfig = {
  API_LINK: "https://api.petfinder.com/v2/animals",
  limitData: 9
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
      'Authorization': 'Bearer ' + api_key,
    },
    success: function (data) {
      loadedAnimals = data.animals;
      loadAnimalsContainer(loadedAnimals);
    },
    error: function (error) {
      if (error.status === 0) {
        console.error('Error fetching data:', error);
        refreshToken();
      }
    }
  }).fail(function (err) {
    console.log(err);
  });
};
function refreshToken() {
  $.ajax({
    url: 'https://api.petfinder.com/v2/oauth2/token',
    method: 'POST',
    data: {
      'grant_type': 'client_credentials',
      'client_id': 'fQDEVfRpklKrmx6L96T7q0qjnaLWCHYwGrNlW9kxVQQAIgKSJf',
      'client_secret': 'tjFVi0qDHsISxSxnuQybbOncXojDxJlxqufES9CV'
    },
    success: function (response) {
      api_key = response.access_token;
      loadAnimalsData();
    },
    error: function (error) {
      console.error('Error refreshing token:', error);
    }
  });
}

$(document).ready(() => {
  loadAnimalsData();

});

const getAttributeName = (key) => {
  const name = {
    'spayed_neutered': 'Esterilizado(a)',
    'house_trained': 'Treinado(a) para ir ao banheiro',
    'declawed': 'Descornada',
    'special_needs': 'Necessidades especiais',
    'shots_current': 'Vacinas em dia'
  };

  return name[key] || key;
}


const showAnimalData = (data) => {
  const modal = $('.card-text');

  // modal.find('.detalhesSobreAnimal').empty();

  const name = data?.name || "Sem nome";
  const age = data?.age || "Sem idade";


  const description = data?.description || "Sem descrição";
  const gender = data?.gender || "Sem gênero";
  const size = data?.size || "Sem tamanho";
  const status = data?.status || "Sem status";
  const url = data?.url || "Sem url";
  const contact = data?.contact[0] || "Sem dados"

  const attributos = data?.attributes || [];
  const attributosLista = $('.detalhesSobreAnimal').find('.animalAttributos');
  
  $.each(attributos, function (key, value) {
    const listItem = $('<li></li>');
    listItem.html(`${getAttributeName(key)}: ${value === null ? 'N/A' : value ? 'Sim' : 'Não'}`);
    listItem.appendTo(attributosLista);
  });
  


  // animalContact
  // animalDescription
  // animalGender
  // animalData
  // animalSize
  // animalType
  // animalStatus

  modal.find('.animalName').text(name);
  modal.find('.animalAge').text(age);
  modal.find('.animalDescription').text(description);
  modal.find('.animalGender').text(gender);
  modal.find('.animalSize').text(size);
  modal.find('.animalStatus').text(status);
  modal.find('.animalContact').text(contact);

  modal.find('.animalLink').text('LINK');
  modal.find('.animalLink').attr('href', url);
}
const getAnimalData = (id) => {
  let loadedAnimal;

  $.ajax({
    url: apiConfig.API_LINK + '/' + id,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + api_key,
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
      'Authorization': 'Bearer ' + api_key,
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