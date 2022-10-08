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
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let amPM = document.querySelector("#am-pm");
  if (currentHour > 12) {
    amPM.innerHTML = "PM";
    currentHour = currentHour - 12;
  } else {
    if (currentHour === 12) {
      amPM.innerHTML = "PM";
    } else {
      if (currentHour < 12 && currentHour > 0) {
        amPM.innerHTML = "AM";
      } else {
        if (currentHour === 0) {
          currentHour = currentHour + 12;
          amPM.innerHTML = "AM";
        }
      }
    }
  }
  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}
// debugger;
function getForecast(coordinates) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
  axios.get(apiUrl).then(displayHourlyForecast);
}

// function getHourlyForecast(coordinates) {
//   let apiKey = "50c2acd53349fabd54f52b93c8650d37";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
//   axios.get(apiUrl).then(displayHourlyForecast);
// }

function showTemp(response) {
  let mainTemp = document.querySelector("#searched-temp");
  let currentTemp = Math.round(response.data.main.temp);
  let city = document.querySelector("#current-city");
  let humidity = document.querySelector("#humidity-value");
  let wind = document.querySelector("#wind-speed");
  let weatherType = document.querySelector("#weather-description");
  let mainIcon = document.querySelector("#main-icon");
  let iconCode = response.data.weather[0].icon;
  mainTemp.innerHTML = `${currentTemp}°`;
  city.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherType.innerHTML = response.data.weather[0].description;
  console.log(iconCode);

  if ([`09d`, `09n`, `10d`, `10n`].includes(iconCode)) {
    mainIcon.setAttribute("src", "icons/rainy.svg");
  } else {
    if (iconCode === `01d`) {
      mainIcon.setAttribute("src", "icons/day.svg");
    } else {
      if (iconCode === `01n`) {
        mainIcon.setAttribute("src", "icons/night.svg");
      } else {
        if (iconCode === `02d`) {
          mainIcon.setAttribute("src", "icons/cloudy-day.svg");
        } else {
          if (iconCode === `02n`) {
            mainIcon.setAttribute("src", "icons/cloudy-night.svg");
          } else {
            if ([`03d`, `04d`, `03n`, `04n`, `50d`, `50n`].includes(iconCode)) {
              mainIcon.setAttribute("src", "icons/cloudy.svg");
            } else {
              if ([`11d`, `11n`].includes(iconCode)) {
                mainIcon.setAttribute("src", "icons/thunder.svg");
              } else {
                if ([`13d`, `13n`].includes(iconCode)) {
                  mainIcon.setAttribute("src", "icons/snowy.svg");
                }
              }
            }
          }
        }
      }
    }
  }
  mainIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
  // getHourlyForecast(response.data.coord);
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

function buttonSelect() {
  function buttonPosition(position) {
    console.log(position);
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let apiKey = "50c2acd53349fabd54f52b93c8650d37";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemp);
  }

  navigator.geolocation.getCurrentPosition(buttonPosition);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  // console.log(hours);
  // console.log(timestamp);
  return hours;
}

function formatMinutes(timestamp) {
  let date = new Date(timestamp * 1000);
  let minutes = date.getMinutes();
  // console.log(timestamp);
  return minutes;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let iconCode = forecastDay.weather[0].icon;
      if ([`09d`, `09n`, `10d`, `10n`].includes(iconCode)) {
        iconCode = `icons/rainy.svg`;
      } else {
        if (iconCode === `01d`) {
          iconCode = `icons/day.svg`;
        } else {
          if (iconCode === `01n`) {
            iconCode = `icons/night.svg`;
          } else {
            if (iconCode === `02d`) {
              iconCode = `icons/cloudy-day.svg`;
            } else {
              if (iconCode === `02n`) {
                iconCode = `icons/cloudy-night.svg`;
              } else {
                if (
                  [`03d`, `04d`, `03n`, `04n`, `50d`, `50n`].includes(iconCode)
                ) {
                  iconCode = `icons/cloudy.svg`;
                } else {
                  if ([`11d`, `11n`].includes(iconCode)) {
                    iconCode = `icons/thunder.svg`;
                  } else {
                    if ([`13d`, `13n`].includes(iconCode)) {
                      iconCode = `icons/snowy.svg`;
                    }
                  }
                }
              }
            }
          }
        }
      }
      forecastHTML =
        forecastHTML +
        `
    <li>
                  <div class="card-body pt-2 pb-0 mb-n2">
                    <p class="temperature-days mb-n2">${formatDay(
                      forecastDay.dt
                    )}
                    </p>
                    <img src="${iconCode}" alt="Sidebar weather icon" class="sidebar-icon icon-style mt-n3">
                  </div>
                </li>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayHourlyForecast(response) {
  let hourlyForecast = response.data.hourly;
  let minutesForecast = response.data.minutely;
  // console.log(hourlyForecast[0]);
  let hourlyForecastElement = document.querySelector("#hourly-forecast");

  let hourlyForecastHTML = "";
  hourlyForecast.forEach(function (foreCastHourly, index) {
    let hour = formatHour(foreCastHourly.dt);
    let newMinutes = formatMinutes(minutesForecast[0].dt);
    // let hourlyTemp = Math.round(hourlyForecast[index].temp);
    // console.log(hourlyTemp);
    if (newMinutes < 10) {
      newMinutes = "0" + newMinutes;
    }
    // console.log(newMinutes);
    // let hourlyTemp = Math.round(hourlyForecast[0].temp);

    if (index < 5) {
      if (hour === 0) {
        hour = hour + 12 + ":" + newMinutes + " AM";
        // console.log(hour);
      } else {
        if (hour < 12) {
          hour = hour + ":" + newMinutes + "  AM";
          // console.log(hour);
        } else {
          if (hour > 12) {
            hour = hour - 12 + ":" + newMinutes + " PM";
            // console.log(hour);
          } else {
            if (hour === 12) {
              hour = hour + ":" + newMinutes + " PM";
            }
          }
        }
      }
      let iconCode = foreCastHourly.weather[0].icon;
      console.log(iconCode);
      if ([`09d`, `09n`, `10d`, `10n`].includes(iconCode)) {
        iconCode = `icons/rainy.svg`;
      } else {
        if (iconCode === `01d`) {
          iconCode = `icons/day.svg`;
        } else {
          if (iconCode === `01n`) {
            iconCode = `icons/night.svg`;
          } else {
            if (iconCode === `02d`) {
              iconCode = `icons/cloudy-day.svg`;
            } else {
              if (iconCode === `02n`) {
                iconCode = `icons/cloudy-night.svg`;
              } else {
                if (
                  [`03d`, `04d`, `03n`, `04n`, `50d`, `50n`].includes(iconCode)
                ) {
                  iconCode = `icons/cloudy.svg`;
                } else {
                  if ([`11d`, `11n`].includes(iconCode)) {
                    iconCode = `icons/thunder.svg`;
                  } else {
                    if ([`13d`, `13n`].includes(iconCode)) {
                      iconCode = `icons/snowy.svg`;
                    }
                  }
                }
              }
            }
          }
        }
      }
      // let hourlyTemp = Math.round(hourlyForecast[0].temp);
      hourlyForecastHTML =
        hourlyForecastHTML +
        `<div class="col ">
              <div class="row ">
                <div class="col-12">
                  <ul>
                    <li>
                      ${hour}
                    </li>
                    <li class="pt-2">
                      ${Math.round(hourlyForecast[index].temp)}°F
                    </li>
                    <li class="pt-4">
                      <img src="${iconCode}" alt="Bottom row weather icon"
                        class="bottom-row-icons icon-style mt-n4 mb-n3 ml-2">
                    </li>
                  </ul>
                </div>

              </div>
            </div>`;
    }
  });
  // hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  // console.log(hourlyForecastHTML);
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

let currentTime = new Date();
let timeToday = document.querySelector("#time-now");
let searchBar = document.querySelector("#search-city");

timeToday.innerHTML = formatDate(currentTime);
searchBar.addEventListener("submit", handleCity);

let clickMe = document.querySelector("button");
clickMe.addEventListener("click", buttonSelect);

searchCity("New York");
