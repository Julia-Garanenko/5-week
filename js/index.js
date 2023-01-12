function formatToday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let dayString = days[day];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${dayString} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if ((index > 0, index < 6)) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-2">
         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
         <img
           src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png"
           alt=""
           width="42"
         />
         <div class="weather-forecast-temperatures">
           <span class="weather-forecast-temperature-max"> ${Math.round(
             forecastDay.temp.max
           )}° </span>
           <span class="weather-forecast-temperature-min"> ${Math.round(
             forecastDay.temp.min
           )}° </span>
         </div>
       </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data);

  let dayTime = response.data.dt;
  let dayTimeElement = document.querySelector("#day-time");
  dayTimeElement.innerHTML = formatToday(dayTime);

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentDegree");
  temperatureElement.innerHTML = `${temperature}`;
  let cityAnswer = document.querySelector("#cityName");
  cityAnswer.innerHTML = `${response.data.name}`;
  let precipitation = response.data.main.humidity;
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = `${precipitation}`;
  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = ` ${wind}`;
  let weatherDescr = response.data.weather[0].description;
  let weatherDescrElement = document.querySelector("#weather-descr");
  weatherDescrElement.innerHTML = `${weatherDescr}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast;
  getForecast(response.data.coord);
}

function searchWeather() {
  let cityInput = document.querySelector("#cityInput");

  let apiKey = "f80d03d38a44bb2e66b61aafc4bf8047";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid${apiKey}`).then(displayWeather);
}

let linkSearch = document.querySelector("#button-search");
linkSearch.addEventListener("click", searchWeather);

function displayCurrentWeather(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function searchCurrentWeather() {
  navigator.geolocation.getCurrentPosition(displayCurrentWeather);
}

let linkCurrent = document.querySelector("#button-current");
linkCurrent.addEventListener("click", searchCurrentWeather);

document.querySelector("#cityInput").value = "Paris";
searchWeather();
displayForecast();
