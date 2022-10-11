
// for input fields
const card = document.querySelector('.card');
const heading = document.querySelector('.card-body h1 span');
const date = document.querySelector('.card-body h3');
const temperature = document.querySelector('.card-body h2');
const description = document.querySelector('.card-body p');
const insertIcon = document.querySelector('.image-icon');
// for the search
const button = document.querySelector('.form');
const search = document.querySelector('.form input');
const currentLocation = document.querySelector('.bi');

// `fetchData` method to call the api
const fetchData = (query) => {
  const token = 'pk.eyJ1Ijoid2lsbG1yYSIsImEiOiJjbDZnaWJwbncwcmZvM3BvcnYwY2RsZm1zIn0.rWLDt_r5jFg6Id_zVD346g';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const lon = data.features[0].center[0];
      const lat = data.features[0].center[1];
      fetchWeatherByCoordinates(lon, lat);
    });
};

// `fetchWeatherByCoordinates` method to call the api with user's coordinates
const fetchWeatherByCoordinates = (lon, lat) => {
  const key = 'c44198d326d37b9a4ce84347a6541982';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      updateCard(data);
    });
};
// `updateCard` method to update relative data with the results we got from api
const updateCard = (data) => {
  insertIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  temperature.innerHTML = `${data.main.temp.toFixed(0)}°C`;
  description.innerHTML = data.weather[0].main;
  heading.innerHTML = data.name;
  date.innerHTML = formatDate();
  // const link = `https://openweathermap.org/img/w/${iconId}.png`;
  // const nodeList = document.getElementsByTagName("link");
  // const favicon = nodeList[0].getAttribute("href");
  // console.log(favicon)
};

// `formatDate` method to update the date

const formatDate = () => {
  const d = new Date();
  const options = {
    weekday: 'long',
    month: 'long', // could be short
    day: 'numeric',
    hour: 'numeric', // could be 2-digit
    minute: 'numeric' // could be 2-digit
  };
  const p = d.toLocaleTimeString('en-us', options);
  return p;
};


// add event listeners to button and location
button.addEventListener("submit", (event) => {
  event.preventDefault();
  card.classList.remove("d-none");
  fetchData(search.value);
  search.value = "";
});

navigator.geolocation.getCurrentPosition((data) => {
  currentLocation.addEventListener("click", (event) => {
    event.preventDefault();
    card.classList.remove("d-none");
    const lon = data.coords.longitude;
    const lat = data.coords.latitude;
    fetchWeatherByCoordinates(lon, lat);
  });
});



