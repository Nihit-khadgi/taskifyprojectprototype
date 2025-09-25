const container = document.querySelector('.container');
const searchBtn = container.querySelector('.search-box button');
const searchInput = container.querySelector('.search-box input');
const weatherBox = container.querySelector('.weather-box');
const weatherDetails = container.querySelector('.weather-details');
const error404 = container.querySelector('.not-found');

searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (!city) return;

    const APIKey = 'apikey';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(res => res.json())
        .then(json => {
            if (json.cod === '404') {
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = weatherBox.querySelector('img');
            const temperature = weatherBox.querySelector('.temperature');
            const description = weatherBox.querySelector('.description');
            const humidity = weatherDetails.querySelector('.humidity span');
            const wind = weatherDetails.querySelector('.wind span');

            // Set weather image
            switch (json.weather[0].main) {
                case 'Clear': image.src = 'assets/clear.png'; break;
                case 'Rain': image.src = 'assets/rain.png'; break;
                case 'Snow': image.src = 'assets/snow.png'; break;
                case 'Clouds': image.src = 'assets/cloud.png'; break;
                case 'Haze': image.src = 'assets/mist.png'; break;
                default: image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
        });
});
