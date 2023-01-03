const apiKey = "06837e2c8b3ba1207c2bdd4fe02a2b44";
let weatherEndPoint =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  apiKey +
  "&units=metric";

let foreCastEndPoint =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" +
  apiKey;

let geocodingEndPoint =
  "http://api.openweathermap.org/geo/1.0/direct?limit=5&appid=" +
  apiKey +
  "&q=";

let reverseGeocodingEndPoint =
  "http://api.openweathermap.org/geo/1.0/reverse?limit=1&appid=" +
  apiKey +
  "&lat=";

let searchBox = document.querySelector(".weather-search");

let dataList = document.getElementById("suggestions");

let city = document.querySelector(".weather-city");
let day = document.querySelector(".weather-day");

let humidity = document.querySelector(".weather-indicator-humidity .value");
let wind = document.querySelector(".weather-indicator-wind .value");
let pressure = document.querySelector(".weather-indicator-pressure .value");

let mainImage = document.querySelector(".weather-image");

let temperature = document.querySelector(".weather-temperature .value");

let forecastContainer = document.querySelector(".weather-forecast");

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
      // console.log(object);
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

let dayOfWeek = (milliSeconds = new Date().getTime()) => {
  return new Date(milliSeconds).toLocaleDateString("en-EN", {
    weekday: "long",
  });
};

let weatherImages = [
  {
    url: "images/broken-clouds.png",
    ids: [803, 804],
  },
  {
    url: "images/clear-sky.png",
    ids: [800],
  },
  {
    url: "images/few-clouds.png",
    ids: [801],
  },
  {
    url: "images/mist.png",
    ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  },
  {
    url: "images/rain.png",
    ids: [500, 501, 502, 503, 504],
  },
  {
    url: "images/scattered-clouds.png",
    ids: [802],
  },
  {
    url: "images/shower-rain.png",
    ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321],
  },
  {
    url: "images/snow.png",
    ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  },
  {
    url: "images/thunderstorm.png",
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  },
];

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

  let imageID = weatherObj.weather[0].id;

  weatherImages.forEach((object) => {
    if (object.ids.indexOf(imageID) != -1) {
      mainImage.src = object.url;
    }
  });

  temperature.innerText =
    weatherObj.main.temp > 0
      ? "+" + Math.round(weatherObj.main.temp)
      : Math.round(weatherObj.main.temp);
};

let updateForecast = (forecast) => {
  forecastContainer.innerHTML = "";
  let forecastItem = "";

  forecast.forEach((dayObj) => {
    let iconUrl =
      "http://openweathermap.org/img/wn/" + dayObj.weather[0].icon + "@2x.png";

    let eachDayTemperature =
      dayObj.main.temp > 0
        ? "+" + Math.round(dayObj.main.temp)
        : Math.round(dayObj.main.temp);

    let dayName = dayOfWeek(dayObj.dt * 1000);

    forecastItem += `<div class="col-md mb-3">
    <div class="card weather-forecast-item">
        <img src="${iconUrl}" class="card-img-top weather-forecast-icon mt-3" alt="${dayObj.weather[0].description}">
        <h3 class="card-title weather-forecast-day my-4">${dayName}</h3>
        <p class="card-text weather-forecast-temperature mb-3">
            <span class="value">${eachDayTemperature}</span> &deg;C
        </p>
    </div>
</div>`;

    forecastContainer.innerHTML = forecastItem;
  });
};

let weatherForCity = async (city) => {
  let weatherObj = await getWeatherByCityName(city);
  // console.log(weatherObj);
  if (weatherObj.cod === "404") {
    Swal.fire({
      title: "Not Found",
      text: "Invalid Location",
      icon: "error",
    });
    return;
  }
  updateCurrentWeather(weatherObj);
  let cityId = weatherObj.id;
  let forecast = await getForecastByCityID(cityId);
  updateForecast(forecast);
};

searchBox.addEventListener("keydown", async (eventObj) => {
  if (eventObj.keyCode === 13) {
    weatherForCity(searchBox.value);
  }
});

searchBox.addEventListener("input", async () => {
  if (searchBox.value.length <= 2) {
    return;
  }

  let endPoint = geocodingEndPoint + searchBox.value;
  let response = await fetch(endPoint);
  let responseObj = await response.json();
  // console.log(responseObj);
  dataList.innerHTML = "";
  responseObj.forEach((city) => {
    let option = document.createElement("option");
    option.value = `${city.name}${city.state ? ", " + city.state : ""}, ${
      city.country
    }`;
    dataList.appendChild(option);
  });
});

window.onload = () => {
  let accurateObj = {
    enableHighFrequency: true,
    timeout: 5000,
    maximumAge: 0,
  };
  navigator.geolocation.getCurrentPosition(
    async (positionObj) => {
      let coordinates = positionObj.coords;
      let latitude = coordinates.latitude.toString();
      let longitude = coordinates.longitude.toString();
      console.log("Latitude: " + latitude);
      console.log("Longitude: " + longitude);
      let endPoint = latitude + "&lon=" + longitude;
      reverseGeocodingEndPoint += endPoint;
      // console.log(reverseGeocodingEndPoint);
      try {
        let response = await fetch(reverseGeocodingEndPoint);
        let responseObj = await response.json();
        let cityName = responseObj[0].name;
        console.log(cityName);
        weatherForCity(cityName);
      } catch (error) {
        Swal.fire({
          title: "Not Found",
          text: "Invalid Latitude & Longitude",
          icon: "error",
        });
        return;
      }
    },
    (errorObj) => {
      console.log("Error code: " + errorObj.code);
      console.log("Error Message: " + errorObj.msg);
    },
    accurateObj
  );
};
