'use strict'
const animalCard = $('.animalCard');

const API_LINK = "https://api.petfinder.com/v2/animals";
const apiConfig = {
  API_LINK: "https://api.petfinder.com/v2/animals",
  Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmUURFVmZScGtsS3JteDZMOTZUN3EwcWpuYUxXQ0hZd0dyTmxXOWt4VlFRQUlnS1NKZiIsImp0aSI6ImE5OWE5ZjQ5NTYzNWI3NTBhMjFmYTlkNWYwZDc1MjcyYzI5MmY4NjkwMWE2Y2M2NjY4MzNmMTQzODkxMTU3M2YxMDIxMTVkZjA1OGUyZmJlIiwiaWF0IjoxNzA2MjI1MDk0LCJuYmYiOjE3MDYyMjUwOTQsImV4cCI6MTcwNjIyODY5NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.q_-ZigGsNBYVEbxYxwzfR74AWQsuwyS5AFsklN2MKgHj0Oyu4H1cXYc9SLZmHMcm_OUDSuzXMdXktbC8IaUlOi1g38sPiCHKFmeApxL30V01lHpMiPiuN6bCKHDB1vCVd9UVQHJqimFh0X_dFTtD8TFk9-6vtwhn6OPC180f9SFNsGiy9NURrX0Dp8RDv7aroeM6QzUmaYiVt9nz_dDvdr35Flak4v_dZSySEgi3xsDA_H4nTykoUFQzSP4jUuh_AvUwVA-Egggx1b5fByHPqC8ELBNcI_XqtPOXPkKMZNLUqQgGms_wkbK_yLreLo5gkRLq32fN1IPd0pd85U6CKw",
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