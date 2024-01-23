'use strict'
const animalCard = $('.animalCard');

const API_LINK = "https://api.petfinder.com/v2/animals";
const apiConfig = {
  API_LINK: "https://api.petfinder.com/v2/animals",
  Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmUURFVmZScGtsS3JteDZMOTZUN3EwcWpuYUxXQ0hZd0dyTmxXOWt4VlFRQUlnS1NKZiIsImp0aSI6ImQzNGIyOWQ2NDhlMDY4ZjM3MzdkNjZkNjJkYjM4NzY4ZTRjMzI1YjVmZWY0YTBlYjZkYjA4ZjAxOTRhYTg0N2Y5NTQ2NWQwN2RlNTcwNTU0IiwiaWF0IjoxNzA2MDQ0OTMwLCJuYmYiOjE3MDYwNDQ5MzAsImV4cCI6MTcwNjA0ODUzMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.mG8h-_16fiTArbjV2qg_PAQig50zAOpncgDp8tQXejIvSwUzumNOCpHCW1RWMHy-y4rYjevqO7ywGUMkzAcaqK_62guyV1no0h8V0S1j9qYoYr4begLx-cFOZi0_PTvBsfik4wC55a6Cizf5_N1sC2ZcNh2pIxvE2-Yk93BfOq5hGd4IfqE3fiu5MhbH8BeCg2EDwDyXtRCkBaoAPCHZ4on8llM4pgR3a9r25TSfRebVhRjpK21Wo4OWr5_ww5JMIXFpeWQmq5z9qFoPJk30Dajv-W6FEr8y4hx_Im-R_GIlB4btzoi4oHkoVrVZgo_dDeXF1IZUm_VtPKmrCgXPIA",
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

  console.log(data);

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
  
  console.log('Attributes:', attributos);

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