import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const inputCountry = document.querySelector('#search-box');
const oneCountry = document.querySelector('.country-info');
const listCountry = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;
inputCountry.addEventListener('input', debounce(funcInput, DEBOUNCE_DELAY));

function funcInput() {
  const valueInput = inputCountry.value.trim();
  if (!valueInput) {
    return;
  }

  fetchCountries(valueInput).then(countries => {
    if (!countries) {
      return;
    }
    oneCountry.innerHTML = '';
    listCountry.innerHTML = '';
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 1 && countries.length <= 10) {
      renderSeveralCountry(countries);
      console.log(countries);
    } else {
      console.log(countries);
      renderOneCountry(countries);
    }
  });
}
function renderSeveralCountry(arrayCountries) {
  const resultMap = arrayCountries
    .map(country => {
      return `<li><img src="${country.flags.svg}" width ="50" higth ="50"><p>${country.name.official}</p></li>`;
    })
    .join('');
  listCountry.insertAdjacentHTML('beforeend', resultMap);
}
function renderOneCountry(arrayCountries) {
  const resultMapfor1 = arrayCountries
    .map(country => {
      return `<img src="${country.flags.svg}" width ="50" higth ="50"><p>${
        country.name.official
      }</p>
      <p>Capital :${country.capital}</p><p>Population :${
        country.population
      }</p><p>Languages:${Object.values(country.languages)}</p>`;
    })
    .join('');
  oneCountry.insertAdjacentHTML('beforeend', resultMapfor1);
}
