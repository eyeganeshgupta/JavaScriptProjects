const apiKey = "apiKey";
let weatherEndPoint =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  apiKey +
  "&units=metric";

let getWeatherByCityName = async (cityName) => {
  let endPointWithCityName = weatherEndPoint + "&q=" + cityName;

  // Open Weather Map is based on promise

  try {
    let response = await fetch(endPointWithCityName);
    let weatherInfo = await response.json();
    console.log(weatherInfo);
    document.querySelector("div").innerHTML +=
      cityName + ": " + weatherInfo.main.temp + "<br/>";
  } catch (error) {
    console.log(error);
  }
};

getWeatherByCityName("Ghaziabad");

getWeatherByCityName("Mumbai");
