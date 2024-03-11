class HourForecast {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.hourForecast = null;
  }

  updateHourForecast(data) {
    if (!this.hourForecast) {
      this.hourForecast = document.createElement('div');
      this.hourForecast.id = 'hourForecast';
      this.hourForecast.classList.add('hourForecast');
      this.container.appendChild(this.hourForecast);
    } else {
      this.hourForecast.innerHTML = '';
    }

    console.log(data.forecastHours);

    data.forecastHours.forEach((hour) => {
      const hourDiv = document.createElement('div');
      hourDiv.classList.add('hourDiv');
      hourDiv.innerHTML = `
        <h3>${hour.time}</h3>
        <p>Temperature: ${hour.temp}°C</p>
        <img src="${hour.icon}" alt="${hour.condition}">
      `;
      this.hourForecast.appendChild(hourDiv);
    });
  }
}

export default HourForecast;
