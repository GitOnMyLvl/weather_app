class WeatherCard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.weatherCard = null;
  }

  updateWeather(data) {
    if (!this.weatherCard) {
      this.weatherCard = document.createElement('div');
      this.weatherCard.id = 'weatherCard';
      this.container.appendChild(this.weatherCard);
    } else {
      this.weatherCard.innerHTML = '';
    }

    this.weatherCard.innerHTML = `
      <h2>Location: ${data.city}, ${data.country}</h2>
      <h3>Local Time: ${data.localtime}</h3>
      <p>Temperature: ${data.temp}°C, feels like: ${data.feelsLike}°C</p>
      <p>${data.forecastDays[0].minTemp}°C - ${data.forecastDays[0].maxTemp}°C</p>
      <img src="${data.icon}" alt="${data.condition}">
      <p>Humidity: ${data.humidity}%</p>
      <p>Wind: ${data.windSpeed} kph, ${data.windDir}</p>
    `;
  }
}

export default WeatherCard;
