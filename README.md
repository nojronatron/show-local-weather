# Show Local Weather

## Objective

Build an app that is functionally similar to [this codepen example](https://codepen.io/freeCodeCamp/full/bELRjV).

## Rules

Don't look at the example project's code. Figure it out for yourself.

Fulfill the below user stories and get all of the tests to pass. Use whichever libraries or APIs you need. Give it your own personal style.

## User Stories

I can see the weather in my current location.

I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

I can push a button to toggle between Fahrenheit and Celsius.

## About Secure Connections

Many internet browsers now require an HTTP Secure (https://) connection to obtain a user's locale via HTML5 Geolocation. For this reason, we recommend using HTML5 Geolocation to get user location and then use the [freeCodeCamp Weather API](https://weather-proxy.freecodecamp.rocks/) which uses an HTTP Secure connection for the weather. Also, be sure to connect to CodePen.io via `https://`.

## Submitting Completed Work

When you are finished, include a link to your project on CodePen and click the "I've completed this challenge" button.

## About FreeCodeCamp Weather API

Use the endpoint `https://weather-proxy.freecodecamp.rocks/` to get the weather at a location.

To prevent abuses this server accepts `GET` requests only, and serves only the route `/api/current?lon=:longitude&lat=:latitude`. Images links are included in the JSON under `weather[0].icon`. This is enough to complete the challenge.

Example request: `https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139`

Example response:

```javascript
{
  "coord":
  {
    "lon": 139,
    "lat": 35
  },
  "weather":
  [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "https://cdn.freecodecamp.org/weather-icons/02n.png"
    }
  ],
  "base": "stations",
  "main":
  {
    "temp": 25,
    "feels_like": 28.82,
    "temp_min": 25,
    "temp_max": 25,
    "pressure": 1010,
    "humidity": 84
  },
  "visibility": 10000,
  "wind":
  {
    "speed": 1.34,
    "deg": 177,
    "gust": 2.68
  },
  "clouds":
  {
    "all": 16
  },
  "dt": 1597922946,
  "sys":
  {
    "type": 3,
    "id": 2019346,
    "country": "JP",
    "sunrise": 1597867673,
    "sunset": 1597915636
  },
  "timezone": 32400,
  "id": 1851632,
  "name": "Shuzenji",
  "cod": 200
}
```
