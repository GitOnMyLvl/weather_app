import { parseISO, format } from 'date-fns';

class DaysForecast {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.dayForecast = null;
  }

  updateDayForecast(data) {
    if (!this.dayForecast) {
      this.dayForecast = document.createElement('div');
      this.dayForecast.id = 'dayForecast';
      this.dayForecast.classList.add('dayForecast');
      this.dayForecastList = document.createElement('ul');
      this.dayForecastList.id = 'dayForecastList';
      this.dayForecastList.classList.add('dayForecastList');
      this.dayForecast.appendChild(this.dayForecastList);
      this.container.appendChild(this.dayForecast);
    } else {
      this.dayForecastList.innerHTML = '';
    }

    Object.keys(data.forecastDays).forEach((key) => {
      const day = data.forecastDays[key];
      const dayListItem = document.createElement('li');
      dayListItem.classList.add('dayListItem');
      const date = parseISO(day.date);
      const dayName = format(date, 'EEEE');
      dayListItem.innerHTML = `
        <span>${dayName}</span>
        <span>${day.maxTemp}° / ${day.minTemp}°</span>
        <img src="${day.icon}" alt="${day.condition}">
      `;
      this.dayForecastList.appendChild(dayListItem);
    });
  }
}

export default DaysForecast;
