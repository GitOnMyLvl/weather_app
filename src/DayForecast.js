class DaysForecast {
  constructor(containerId){
    this.container = document.getElementById(containerId);
    this.dayForecast = null
  }

  updateDayForecast(data){
    if (!this.dayForecast){
      this.dayForecast = document.createElement('div');
      this.dayForecast.id = 'dayForecast';
      this.container.appendChild(this.dayForecast);
    } else {
      this.dayForecast.innerHTML = '';
    }

    console.log(data.forecastDays);

    Object.keys(data.forecastDays).forEach((key) => {
      const day = data.forecastDays[key];
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('dayDiv');
      dayDiv.innerHTML = `
        <h3>${day.date}</h3>
        <p>Max temperature: ${day.maxTemp}°C</p>
        <p>Min temperature: ${day.minTemp}°C</p>
        <img src="${day.icon}" alt="${day.condition}">
      `;
      this.dayForecast.appendChild(dayDiv);
    });
  }
}

export default DaysForecast;