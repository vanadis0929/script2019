let WEATHER_ARRAY = [];
const WEATHER_API_KEY = '3f9404e51a676528522e910eefbc4158';
const weatherTarget = document.querySelector('#weather');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoords, showError);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function getCoords(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  //console.log(`Latitude: ${lat} \n Longitude: + ${long}`);

  WEATHER_ARRAY = {
    latitude: latitude,
    longitude: longitude
  };

  if (localStorage.getItem('weather') == null) {
    //saveLocalStorage('weather', JSON.stringify(WEATHER_ARRAY));
    localStorage.setItem('weather', JSON.stringify(WEATHER_ARRAY));
  }
  getWeather(latitude, longitude);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      alert('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unknown error occurred.');
      break;
  }
}

function getWeather(lat, long) {
  fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`
    )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const temp = json.main.temp;
      const place = json.name;
      const humidity = json.main.humidity;
      const weatherStatus = json.weather[0].main;
      weatherTarget.innerHTML = `기온: ${temp}C° / 지역: ${place} / 날씨 = ${weatherStatus} / 습도: ${humidity}%`;

      document.querySelector('#reset_weather').style.display = 'block';
    });
}

window.addEventListener('load', getLocation);