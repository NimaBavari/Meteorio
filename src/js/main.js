const searchCityForm = document.getElementById('search-city-form');
const searchInput = document.getElementById('search-city-input');
const searchBtn = document.getElementsByClassName('btn')[0];
const weather = document.getElementById('weather');
const searchAgainBtn = document.getElementById('search-again-btn');
const BASE_URL = 'http://api.weatherstack.com/current?access_key=78b6376e9b1eaf841e6a89f6d1ac5021&query=';

searchAgainBtn.style.display = 'none';

searchBtn.disabled = true;
searchInput.addEventListener('keyup', (evt) => {
    if (!evt.target.value) searchBtn.disabled = true;
    else searchBtn.disabled = false;
});

searchCityForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    weather.innerHTML = '<img class="loading" src="./img/loading.jpg" alt="Loading..." />';
    let searchTerm = searchInput.value;
    fetch(`${BASE_URL}${searchTerm}`)
        .then((response) => response.json())
        .then((results) => {
            searchInput.value = '';
            const { location, current } = results;
            weather.innerHTML = `<div class="card weather-card">
                <div class="card-body">
                    <h5 class="card-title">${location.name}, ${location.country}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${current.temperature} &#176;C</h6>
                    <div class="media">
                        <img src="${current.weather_icons[0]}" class="align-self-start mr-3"
                            alt="${current.weather_descriptions[0]}" />
                        <div class="media-body">
                            <h5 class="mt-0">${current.weather_descriptions[0]}</h5>
                            <small>Last refreshed: ${current.observation_time}</small>
                        </div>
                    </div>
                </div>
            </div>`;
        })
        .catch((err) => {
            weather.innerHTML = `<div class="text-danger">
                The city you entered not found. Search again, please.
            </div>`;
        })
        .then(() => {
            evt.target.style.display = 'none';
            searchAgainBtn.style.display = '';
        });
});
