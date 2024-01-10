'use strict';

const form = document.querySelector('#userlocation');
form.addEventListener('submit', submitEventHandler, false);

// originating code from MDN with edits
function positionSuccess(position) {
  // since geolocation is available the event listener is no longer necessary
  // form.removeEventListener('submit', submitEventHandler, false);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // Do something with your latitude and longitude
  sendData(latitude, longitude);
}

function positionError() {
  console.log('Position not available, user will have to submit the form.');
}

// acquire geolocation (if available)
// originating code from MDN with edits
if ('geolocation' in navigator) {
  console.log('geolocation is available');
  navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
} else {
  console.log('geolocation IS NOT available');
  console.log('GeoLocation not available, user will have to submit the form.');
}

function submitEventHandler(event) {
  console.log('Take over form submission');
  event.preventDefault();
  const latitude = event.target.lat.value;
  const longitude = event.target.lon.value;
  sendData(latitude, longitude);
}

async function sendData(lat, lon) {
  console.log('about to sendData lat: ', lat, ', lon: ', lon);
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

// *** update the page with results from fetch *** //
function displayResults(wxDataResponse) {
  console.log('displayResults() wxDataResponse: ', wxDataResponse);

  // set up a header for the weather data
  let cityWx = document.getElementById('cityWx');
  let wxImg = document.getElementById('wxImg');
  let mainDesc = document.getElementById('mainDesc');
  let tempPressHum = document.getElementById('tempPressHum');
  let cloudVis = document.getElementById('cloudVis');
  let WindSpdDegGust = document.getElementById('WindSpdDegGust');
  // let sunRiseSet = document.getElementById('sunRiseSet');

  // city name
  let cityNameEl = document.createElement('h2');
  cityNameEl.textContent = `${wxDataResponse.name} Weather`;
  if (cityWx.hasChildNodes()) {
    cityWx.removeChild(cityWx.firstChild);
  }
  cityWx.appendChild(cityNameEl);

  //  forecast image
  // e.g. https://cdn.freecodecamp.org/weather-icons/02n.png
  let iconUrl = wxDataResponse.weather[0].icon;
  let wxIcon = document.createElement('img');
  wxIcon.src = iconUrl;
  wxIcon.width = '60';
  wxIcon.alt = "Dynamically loaded image of today's weather.";
  if (wxImg.hasChildNodes()) {
    wxImg.removeChild(wxImg.firstChild);
  }
  wxImg.appendChild(wxIcon);

  // weather[0].main, weather[0].description mainDesc
  let mainDescText = `Current Conditions: ${wxDataResponse.weather[0].description}.`;
  mainDesc.textContent = mainDescText;

  // main.temp, main.pressure, main.humidity "tempPressHum"
  let tempC = wxDataResponse.main.temp;
  let tempNumC = new Number(tempC).valueOf();
  let tempF = 2 * tempNumC + 32;
  let temperatureC = `Temperature: ${tempC} C`;
  let temperatureF = `Temperature: ${tempF} F`;

  let tempEl = document.createElement('input');
  tempEl.setAttribute('type', 'button');
  tempEl.setAttribute('value', temperatureC);

  tempEl.removeEventListener('click', updateButton);
  tempEl.addEventListener('click', updateButton);

  function updateButton() {
    if (tempEl.value === temperatureC) {
      tempEl.value = temperatureF;
    } else {
      tempEl.value = temperatureC;
    }
  }

  let pressure = `Pressure: ${wxDataResponse.main.pressure} hG`;
  let pressEl = document.createElement('p');
  pressEl.textContent = pressure;
  let humidity = `Humidity: ${wxDataResponse.main.humidity} %`;
  let humEl = document.createElement('p');
  humEl.textContent = humidity;

  while (tempPressHum.hasChildNodes()) {
    tempPressHum.removeChild(tempPressHum.firstChild);
  }

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

  while (cloudVis.hasChildNodes()) {
    cloudVis.removeChild(cloudVis.firstChild);
  }

  cloudVis.appendChild(cloudEl);
  cloudVis.appendChild(visibilityEl);

  // wind.speed, wind.deg, wind.gust "WindSpdDegGust"
  let winds = `Winds from ${wxDataResponse.wind.deg} at ${wxDataResponse.wind.speed} mph, gusts ${wxDataResponse.wind.gust} mph.`;
  let windsEl = document.createElement('p');
  windsEl.textContent = winds;
  if (WindSpdDegGust.hasChildNodes()) {
    WindSpdDegGust.removeChild(WindSpdDegGust.firstChild);
  }
  WindSpdDegGust.appendChild(windsEl);

  // sys.sunrise, sys.sunset "sunRiseSet" => not epoch-like so skipping
  // let sunrise = `Sunrise: ${wxDataResponse.sys.sunrise}`;
  // let sunriseEl = document.createElement('p');
  // sunriseEl.textContent = sunrise;
  // let sunset = `Sunset: ${wxDataResponse.sys.sunset}`;
  // let sunsetEl = document.createElement('p');
  // sunsetEl.textContent = sunset;
  // sunRiseSet.appendChild(sunriseEl);
  // sunRiseSet.appendChild(sunsetEl);
}
