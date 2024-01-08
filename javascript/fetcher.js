const form = document.querySelector('#userlocation');

async function sendData(lat, lon) {
  console.log('lat: ', lat, ', lon: ', lon);
  let baseUrl =
    'https://weather-proxy.freecodecamp.rocks/api/current?lat=' +
    lat +
    '&lon=' +
    lon;

  fetch(baseUrl, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      displayResults(json);
    })
    .catch((err) => {
      console.error(`Fetch problem: ${err.message}`);
    });
}

// Take over form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const lattitude = event.target.lat.value;
  const longitude = event.target.lon.value;
  sendData(lattitude, longitude);
});

// *** update the page with results from fetch *** //
function displayResults(wxDataResponse) {
  console.log('displayResults() wxDataResponse: ', wxDataResponse);
  console.log(
    'displayResults() wxDataResponse.weather: ',
    wxDataResponse.weather
  );

  // set up a header for the weather data
  // let forecastSection = document.getElementById('forecastData');
  let imgCity = document.getElementById('imgCity');
  let mainDesc = document.getElementById('mainDesc');
  let tempPressHum = document.getElementById('tempPressHum');
  let cloudVis = document.getElementById('cloudVis');
  let WindSpdDegGust = document.getElementById('WindSpdDegGust');
  let sunRiseSet = document.getElementById('sunRiseSet');

  //  forecast image
  // e.g. https://cdn.freecodecamp.org/weather-icons/02n.png
  let iconUrl = wxDataResponse.weather[0].icon;
  let wxImage = document.createElement('img');
  wxImage.src = iconUrl;
  wxImage.width = '60';
  wxImage.alt = "Dynamically loaded image of today's weather.";
  imgCity.appendChild(wxImage);

  // city name
  let cityName = document.createElement('cityName');
  cityName.textContent = `${wxDataResponse.name} Weather`;
  imgCity.appendChild(cityName);

  // weather[0].main, weather[0].description mainDesc
  let mainDescText = `Current Conditions: ${wxDataResponse.weather[0].description}.`;
  mainDesc.textContent = mainDescText;

  // main.temp, main.pressure, main.humidity "tempPressHum"
  let temperature = `Temp: ${wxDataResponse.main.temp} C`;
  let tempEl = document.createElement('p');
  tempEl.textContent = temperature;
  let pressure = `Pressure: ${wxDataResponse.main.pressure} hG`;
  let pressEl = document.createElement('p');
  pressEl.textContent = pressure;
  let humidity = `Humidity: ${wxDataResponse.main.humidity} %`;
  let humEl = document.createElement('p');
  humEl.textContent = humidity;
  tempPressHum.appendChild(tempEl);
  tempPressHum.appendChild(pressEl);
  tempPressHum.appendChild(humEl);

  // clouds (percent sky coverage) and visibility (in 10,000ths of mile) "cloudVis"
  let clouds = `Clouds: ${wxDataResponse.clouds.all} %`;
  let cloudEl = document.createElement('p');
  cloudEl.textContent = clouds;
  let visibility = `Visibility at Ground Level: ${
    wxDataResponse.visibility / 1000
  } mi`;
  let visibilityEl = document.createElement('p');
  visibilityEl.textContent = visibility;
  cloudVis.appendChild(cloudEl);
  cloudVis.appendChild(visibilityEl);

  // wind.speed, wind.deg, wind.gust "WindSpdDegGust"
  let winds = `Winds from ${wxDataResponse.wind.deg} at ${wxDataResponse.wind.speed} mph, gusts ${wxDataResponse.wind.gust} mph.`;
  let windsEl = document.createElement('p');
  windsEl.textContent = winds;
  WindSpdDegGust.appendChild(windsEl);

  // sys.sunrise, sys.sunset "sunRiseSet"
  let sunrise = `Sunrise: ${wxDataResponse.sys.sunrise}`;
  let sunriseEl = document.createElement('p');
  sunriseEl.textContent = sunrise;
  let sunset = `Sunset: ${wxDataResponse.sys.sunset}`;
  let sunsetEl = document.createElement('p');
  sunsetEl.textContent = sunset;
  sunRiseSet.appendChild(sunriseEl);
  sunRiseSet.appendChild(sunsetEl);
}
