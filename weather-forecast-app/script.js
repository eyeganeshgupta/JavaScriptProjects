const apiKey = "06837e2c8b3ba1207c2bdd4fe02a2b44";
let weatherEndPoint =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  apiKey +
  "&units=metric";

let searchBox = document.querySelector(".weather-search");

let city = document.querySelector(".weather-city");
let day = document.querySelector(".weather-day");

let humidity = document.querySelector(".weather-indicator-humidity .value");
let wind = document.querySelector(".weather-indicator-wind .value");
let pressure = document.querySelector(".weather-indicator-pressure .value");

let mainImage = document.querySelector(".weather-image");

let temperature = document.querySelector("weather-temperature .value");

let getWeatherByCityName = async (cityName) => {
  let endPointWithCityName = weatherEndPoint + "&q=" + cityName;
  // Open Weather Map is based on promise
  try {
    let response = await fetch(endPointWithCityName);
    let weatherInfo = await response.json();
    return weatherInfo;
  } catch (error) {
    console.log(error);
  }
};

searchBox.addEventListener("keydown", async (eventObj) => {
  if (eventObj.keyCode === 13) {
    let weather = await getWeatherByCityName(searchBox.value);
    console.log(weather);
  }
});

// getWeatherByCityName("Delhi");

// getWeatherByCityName("Mumbai");
