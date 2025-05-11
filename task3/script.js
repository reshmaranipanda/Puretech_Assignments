

const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const errorMessage = document.getElementById('errorMessage');

const weatherDisplay = document.getElementById('weatherDisplay');
const cityNameElem = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const descriptionElem = document.getElementById('description');
const temperatureElem = document.getElementById('temperature');
const humidityElem = document.getElementById('humidity');
const windSpeedElem = document.getElementById('windSpeed');

const themeToggleBtn = document.getElementById('themeToggle');

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7ef9d7842d919e6241a6da8b07cf540d&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function displayWeather(data) {
  cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
  descriptionElem.textContent = data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());
  temperatureElem.textContent = Math.round(data.main.temp);
  humidityElem.textContent = data.main.humidity;
  windSpeedElem.textContent = data.wind.speed;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.alt = data.weather[0].description;

  weatherDisplay.classList.remove('hidden');
}

function showError(message) {
  errorMessage.textContent = message;
  weatherDisplay.classList.add('hidden');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  errorMessage.textContent = '';
  weatherDisplay.classList.add('hidden');

  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  try {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
  } catch (error) {
    showError(error.message);
  }
});

// Dark/light mode toggle
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeToggleBtn.textContent = '☀️';
  } else {
    themeToggleBtn.textContent = '🌙';
  }
});
