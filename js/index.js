let dayTime = document.querySelector("#day-time");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dayTime.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  console.log(response.data);

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
