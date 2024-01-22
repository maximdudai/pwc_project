'use strict'

const animalCard = $('#animalCard');

const API_LINK = "https://api.petfinder.com/v2/animals";
const apiData = {
  API_LINK: "https://api.petfinder.com/v2/animals",
  Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJXQkhVc2RwcG4yaFg2enMxN3ZRa01Jb2w5OFlJeEhXSVhlVDFKbjY1VEE1U0tkNWYxZyIsImp0aSI6ImE0NzdkMWNkZmJiMmI0MWFkODA2MTBiMDg2ZjI4MzEyMDFjODQ4ZTc2MDI5YmMzNWY2OWMxNDYxZWI3YmNkNzhjZjUzMTIzNzI5N2E1NGU2IiwiaWF0IjoxNzA1OTM5MDU0LCJuYmYiOjE3MDU5MzkwNTQsImV4cCI6MTcwNTk0MjY1NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.bJTXSKz_5OtVKL0EW-Dvce2v1Pb7tiWN1pwc9UT3TuxAOtFsomqSGPwripAbhYIhxdE0GjJTQgXSxxpwjZzjQE5A5jVOmW93NO2DZFq8o-LUv9tGXNAOos_llbsn68BeFW928AGnftI_3OcvVwJGPxYF1IDFdJ1R6V8aXXBXd5Agl5qEojQdHYROsmDe7do09fvwOzmtqGeWpdPoGhL8f9baiztu64RukKen4cT0oH_yhKPzWatFg5neoFRxWf0OWB_yISzmVBKXg9WHc5WAL2VGpczbNQCbQqs9hIABxqkPlwhqNxV0du8N_FrabJquSjv5XKrtLlZwqzCP8m6-2w",
  dataLimit: '10'
}

const createAnimalCard = () => {
  const card = animalCard?.clone();

  $(card).find('.card-title').text(Title);
  $(card).find('.card-text').text(Type);
  $(card).find('.card-img-top').attr('src', Poster);

  $(card).find('.card-link').attr('href', `https://api.themoviedb.org/3/movie/${imdbID}`);
  $(card).find('.card-link').attr('target', '_blank');

  const addToFav = $(card).find('#addToFavorite');
  addToFav.text('Adicionar Favoritos');

  updateFavorites(addToFav, value);
  updateVisual(addToFav, value);

  $('.lista-filmes').append(card);
};

const loadAnimalsData = () => {

  $('#availableAnimails').empty();


  $.ajax({
    url: apiData.API_LINK + '?limit=10',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + apiData.Authorization,
    }
  }).done(function (data) {
    $.each(data?.animals, function (_, value) {

      createAnimalCard(valuel)
    });

  }).fail(function (err) {
    console.log(err);
  });
}

$(document).ready(() => {
  loadAnimalsData();
});
