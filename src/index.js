let currentTime = new Date();
let timeToday = document.querySelector("#time-now");
let currentCity = document.querySelector("#current-city");
let searchBar = document.querySelector("#search-city");
let cityValue = document.querySelector("#city-input");
let changeTemperature = document.querySelector("#change-temp");

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}
function showTemp(response) {
  let mainTemp = document.querySelector("#searched-temp");
  let currentTemp = Math.round(response.data.main.temp);
  let city = document.querySelector("#current-city");
  let humidity = document.querySelector("#humidity-value");
  let wind = document.querySelector("#wind-speed");
  let weatherType = document.querySelector("#weather-description");

  mainTemp.innerHTML = `${currentTemp}°`;
  city.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherType.innerHTML = response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let units = "imperial";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

function handleCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#city-input");
  let city = cityValue.value;
  searchCity(city);
}

function celOrFaren(event) {
  event.preventDefault();
  let temp = document.querySelector("#change-temp");
  let currentTemp = document.querySelector("#searched-temp");
  if (temp.innerHTML == "F") {
    temp.innerHTML = "C";
    currentTemp.innerHTML = "60°";
  } else {
    temp.innerHTML = "F";
    currentTemp.innerHTML = "58°";
  }
}

timeToday.innerHTML = formatDate(currentTime);
searchBar.addEventListener("submit", handleCity);
changeTemperature.addEventListener("click", celOrFaren);

function buttonSelect() {
  function buttonPosition(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let apiKey = "50c2acd53349fabd54f52b93c8650d37";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemp);
  }

  navigator.geolocation.getCurrentPosition(buttonPosition);
}
let clickMe = document.querySelector("button");
clickMe.addEventListener("click", buttonSelect);

searchCity("New York");
