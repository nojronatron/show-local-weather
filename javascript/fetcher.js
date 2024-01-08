const form = document.querySelector('#userlocation');

async function sendData(lat, lon) {
  console.log('lat: ', lat, ', lon: ', lon);
  let baseUrl =
    'https://weather-proxy.freecodecamp.rocks/api/current?lat=' +
    lat +
    '&lon=' +
    lon;
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
    });
    const responseJson = await response.json;
    console.log(responseJson);
  } catch (e) {
    console.error(e);
  }
}

// Take over form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const lattitude = event.target.lat.value;
  const longitude = event.target.lon.value;
  sendData(lattitude, longitude);
});

// *** update the table with results from fetch *** //
function tableResults(jsonResponse) {
  // jsonRepsonse is the response from weather api in json format
  let tableEl = document.getElementById('forecastTable');
  let headerEl = document.createElement('thead');
  tableEl.appendChild(headerEl);
  let row1 = document.createElement('trow');
  headerEl.appendChild(row1);

  //  TH data headlines the forecast with forecast image and the City Name
  let wxImage = document.createElement('img');
  wxImage.src = jsonResponse.weather[0].icon;
  wxImage.width = '100';
  wxImage.alt = "Dynamically loaded image of today's weather.";

  let cityName = document.createElement('cityName');
  cityName.textContent = $`Weather Forecast for {jsonResponse.name}`;
  row1.appendChild(th1El);
}
