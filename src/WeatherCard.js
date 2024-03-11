import { parseISO, format } from 'date-fns';

class WeatherCard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.weatherCard = null;
  }

  updateWeather(data) {
    if (!this.weatherCard) {
      this.weatherCard = document.createElement('div');
      this.weatherCard.id = 'weatherCard';
      this.weatherCard.classList.add('weatherCard');
      this.container.appendChild(this.weatherCard);
    } else {
      this.weatherCard.innerHTML = '';
    }

    const date = parseISO(data.localtime);
    const time = format(date, 'HH:mm');
    const day = format(date, 'EEEE').slice(0, 2);

    this.weatherCard.innerHTML = `
      <div class="tempAndImg">
        <h2>${data.temp}°</h2>
        <img src="${data.icon}" alt="${data.condition}">
      </div>
      <p>${data.city}, ${data.country}</p>
       <p>${data.forecastDays[0].maxTemp}° / ${data.forecastDays[0].minTemp}° feels like: ${data.feelsLike}°</p>
      <p>${day}. , ${time}</p>
      <p>Humidity: ${data.humidity}%</p>
      <p>Wind: ${data.windSpeed} kph</p>
    `;
  }
}

export default WeatherCard;
