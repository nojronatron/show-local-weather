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
  let forecastSection = document.getElementById('forecastData');
  let wxHeadDiv = document.createElement('div');
  forecastSection.appendChild(wxHeadDiv);

  //  forecast image
  // e.g. https://cdn.freecodecamp.org/weather-icons/02n.png

  let iconUrl = wxDataResponse.weather[0].icon;
  console.log('wxDataResponse.weather[0].icon is ', iconUrl);
  let wxImage = document.createElement('img');
  wxImage.src = iconUrl;
  wxImage.width = '100';
  wxImage.alt = "Dynamically loaded image of today's weather.";
  wxHeadDiv.appendChild(wxImage);

  // city name
  let cityName = document.createElement('cityName');
  cityName.textContent = `Weather Forecast for ${wxDataResponse.name}`;
  wxHeadDiv.appendChild(cityName);
}
