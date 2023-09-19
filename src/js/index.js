import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { select: select, catInfo: catInfo, loader: loader, error: error } = elements;

catInfo.classList.add('ishidden');
select.addEventListener('change', presentCatInfo);

fetchSelectorElements();

function fetchSelectorElements(data) {
  fetchBreeds(data)
    .then(data => {
      loader.classList.replace('loader', 'ishidden');

      let selectOptions = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      select.insertAdjacentHTML('beforeend', selectOptions);
      new SlimSelect({
        select: select,
      });
    })
    .catch(onFetchError);
}

function presentCatInfo(event) {
  loader.classList.replace('ishidden', 'loader');
  select.classList.add('ishidden');
  catInfo.classList.add('ishidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(catData => {
      loader.classList.replace('loader', 'ishidden');
      select.classList.remove('ishidden');
      const { url, breeds: breedsData } = catData[0];

      catInfo.innerHTML = `<img src="${url}" alt="${breedsData[0].name}" width="600"/><div class="box"><h2>${breedsData[0].name}</h2><p>${breedsData[0].description}</p><p><strong>Temperament:</strong> ${breedsData[0].temperament}</p></div>`;
      catInfo.classList.remove('ishidden');
    })
    .catch(onFetchError);
}

function onFetchError() {
  select.classList.remove('ishidden');
  loader.classList.replace('loader', 'ishidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}