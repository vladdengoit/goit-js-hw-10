import { Notify } from 'notiflix';
function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  )
    .then(response => {
      if (!response.ok) {
        return Notify.failure('Oops, there is no country with that name');
      }

      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error.message);
    });
}
export { fetchCountries };
