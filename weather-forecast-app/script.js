const apiKey = "06837e2c8b3ba1207c2bdd4fe02a2b44";
let weatherEndPoint =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  apiKey +
  "&units=metric";

let foreCastEndPoint =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" +
  apiKey;

let searchBox = document.querySelector(".weather-search");

let city = document.querySelector(".weather-city");
let day = document.querySelector(".weather-day");

let humidity = document.querySelector(".weather-indicator-humidity .value");
let wind = document.querySelector(".weather-indicator-wind .value");
let pressure = document.querySelector(".weather-indicator-pressure .value");

let mainImage = document.querySelector(".weather-image");

let temperature = document.querySelector(".weather-temperature .value");

let getForecastByCityID = async (cityId) => {
  let endPoint = foreCastEndPoint + "&id=" + cityId;
  let responseObj = await fetch(endPoint);
  let forecastObj = await responseObj.json();
  // console.log(forecastObj);
  let forecastList = forecastObj.list;

  let daily = [];

  forecastList.forEach((object) => {
    let dateStr = object.dt_txt;
    dateStr = dateStr.replace(" ", "T");
    let date = new Date(dateStr);
    let hours = date.getHours();
    if (hours === 12) {
      daily.push(object);
      console.log(object);
    }
  });

  // console.log(daily);

  return daily;
};

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

let dayOfWeek = () => {
  return new Date().toLocaleDateString("en-EN", { weekday: "long" });
};

let updateCurrentWeather = (weatherObj) => {
  city.innerText = weatherObj.name;
  day.innerText = dayOfWeek();
  humidity.innerText = weatherObj.main.humidity;

  let windDirection;
  let degree = weatherObj.wind.deg;
  if (degree > 45 && degree <= 135) {
    windDirection = "East";
  } else if (degree > 135 && degree <= 225) {
    windDirection = "South";
  } else if (degree > 225 && degree <= 315) {
    windDirection = "West";
  } else {
    windDirection = "North";
  }
  wind.innerText = windDirection + ", " + weatherObj.wind.speed;

  pressure.innerText = weatherObj.main.pressure;

  temperature.innerText =
    weatherObj.main.temp > 0
      ? "+" + Math.round(weatherObj.main.temp)
      : Math.round(weatherObj.main.temp);
};

let weatherForCity = async (city) => {
  let weatherObj = await getWeatherByCityName(city);
  // console.log(weatherObj);
  updateCurrentWeather(weatherObj);
  let cityId = weatherObj.id;
  let forecast = await getForecastByCityID(cityId);
};

searchBox.addEventListener("keydown", async (eventObj) => {
  if (eventObj.keyCode === 13) {
    weatherForCity(searchBox.value);
  }
});

// getWeatherByCityName("Delhi");

// getWeatherByCityName("Mumbai");
