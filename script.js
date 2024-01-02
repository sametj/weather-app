const cityText = document.querySelector(".city");
const weatherType = document.querySelector(".title");
const TempText = document.querySelector("#temp");
const minTempText = document.querySelector("#min-temp");
const maxTempText = document.querySelector("#max-temp");

// Weather API KEY
const WEATHER_API = "cd1ecb8ebbd73ab48d7ec0754c3bcd8f";

getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const FULL_URL = `${URL}?q=${city}&appid=${WEATHER_API}&units=imperial`;
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response) => {
    return response.json();
  });
};

console.log(getWeatherData("New York"));

searchCity = () => {
  const city = document.querySelector(".input-field").value;
  getWeatherData(city)
    .then((response) => {
      showWeatherData(response);
    })
    .catch((error) => {
      cityText.innerText = "Please search for a valid city!";
      weatherType.innerText = "----";
      TempText.innerText = "----";
      minTempText.innerText = "----";
      maxTempText.innerText = "----";
      showWeatherData(null);

      weatherType.innerText = "";
    });
};

document.querySelector("#search-button").addEventListener("click", searchCity);
document.querySelector(".input-field").addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchCity();
});

showWeatherData = (weatherData) => {
  cityText.innerText = weatherData.name;
  weatherType.innerText = weatherData.weather[0].main;
  TempText.innerText = weatherData.main.temp;
  minTempText.innerText = weatherData.main.temp_min;
  maxTempText.innerText = weatherData.main.temp_max;
};
