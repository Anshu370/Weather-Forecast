const card_Main = document.querySelector(".card-main");
const searchBox = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weatehr-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

searchBox.addEventListener('click', ()=>{

    const apiKey = '091f49ec3558cdda062bcbf34a19d072';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => {

        if(json.cod === '404'){
            card_Main.style.heigth = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.Style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temprature = document.querySelector('.weather-box .temprature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = './images/clear.png';
                break;

            case 'Rain':
                image.src = './images/rain.png';
                break;

            case 'Snow':
                image.src = './images/snow.png';
                break;

            case 'Clouds':
                image.src = './images/cloud.png';
                break;

            case 'Haze':
                image.src = './images/mist.png';
                break;
        
            default:
                image.src = '';
                break;
        }

        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        card_Main.style.height = '600px';


    })

})