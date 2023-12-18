const card_Main = document.querySelector(".card-main");
const searchBox = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const body = document.getElementsByTagName('body')

searchBox.addEventListener('click', ()=>{

    const APIkey = '091f49ec3558cdda062bcbf34a19d072';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {

        if(json.cod === '404'){
            card_Main.style.height = '400px'
            error404.classList.add('active')
            weatherBox.classList.remove('active')
            weatherDetails.classList.remove('active')
            return;
        }

        card_Main.style.height = '550px'
        error404.classList.remove('active')
        weatherBox.classList.add('active')
        weatherDetails.classList.add('active')

        const image = document.querySelector('.weather-box img');
        const temprature = document.querySelector('.weather-box .temprature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                body.style.background = 'orange'
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            case 'Clouds':
                image.src = 'images/cloud.png';
                break;

            case 'Haze':
                image.src = 'images/mist.png';
                break;
        
            default:
                image.src = 'images/mist.png';
                break;
        }

        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        console.log(parseInt(json.main.temp))
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


    });

});