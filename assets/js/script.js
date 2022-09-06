//aliasing the luxon class
var DateTime = luxon.DateTime;

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// ! This is the api for forecasting
// ! var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;
var weatherCard = document.querySelector("#current-weather");
var form = document.querySelector('#searchCity');
var input = document.querySelector('#search');

var APIkey = "52b2630cb77a5b300aa52ef84d773ad4";
var city = "houston";

function getWeatherByCity(city) {
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;

    fetch(currentURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(weather){
            if (weather.cod == 400 || weather.cod == 404) {
                alert("Please input a valid city.")
                return;
            }
            console.log(weather);
            printWeather(weather);
        })
    
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(forecast){
            if (forecast.cod == 400 || forecast.cod == 404) {
                alert("Please input a valid city.")
                return;
            }
            console.log(forecast);
            printForecast(forecast);
        })
}

function printWeather(weather) {
    console.log("test1");
    
    //Variables for current weather
    var cityName = weather.name;
    var dt = DateTime.fromSeconds(weather.dt).toFormat('cccc, dd MMMM');
    var iconUrl = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
    var temp = weather.main.temp + "°F";
    var hum = weather.main.humidity + " %";
    var windSpeed = weather.wind.speed + " MPH";
    
    //Creating current weather block
    $("#current-weather")
        .addClass("big-card")
        .append("<div'><h2>"+cityName+" (" + dt + ")<img class = 'icon' src = " + iconUrl + " alt = 'Weather Icon'></img></h2></div>")
        // .append("<img src = " + iconUrl + " alt = 'Weather Icon'></img>")
        .append("<p>Temp: "+temp+"</p>")
        .append("<p>Wind: "+windSpeed+"</p>")
        .append("<p>Humidity: "+hum+"</p>")
    
    $("#recent-searches")
        .css("display","block")
        .append("<button class = 'recent'>"+cityName+"</button>")
}

function printForecast(weather) {
    // WHEN I view future weather conditions for that city
    // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    
    $("#forecasted-weather")
            .append("<h2>5-Day Forecast</h2>")
            .append("<div id = 'weather-cards'></div>")

    for (var i = 0; i < 5; i++) {
        //Variables for forecasted weather
        var dt = DateTime.fromSeconds(weather.list[i].dt).toFormat('cccc, dd MMMM');
        var iconUrl = "http://openweathermap.org/img/w/" + weather.list[i].weather[0].icon + ".png";
        var temp = "Temp: " + weather.list[i].main.temp + " °F";
        var windSpeed = "Wind: " + weather.list[i].wind.speed + " MPH";
        var hum = "Humidity: " + weather.list[i].main.humidity + " %";

        $("#weather-cards")
            .append("<div id = 'forecast-day" + i + "'></div>");
    
        $("#forecast-day" + i + "")
            .addClass("day-card")
            .append("<div><h3>"+dt+"</h3></div>")
            .append("<img src = " + iconUrl + " alt = 'Weather Icon'></img>")
            .append("<div>"+temp+"</div>")
            .append("<div>"+windSpeed+"</div>")
            .append("<div>"+hum+"</div>")
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault();

    //getting city name
    city = input.value.trim();

    //clear form
    input.value = "";

    //get weather
    getWeatherByCity(city);
})
