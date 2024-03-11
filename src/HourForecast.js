import { parseISO, format } from 'date-fns';

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
      this.setupScrolling();
    } else {
      this.hourForecast.innerHTML = '';
    }

    data.forecastHours.forEach((hour) => {
      const hourDiv = document.createElement('div');
      const date = parseISO(hour.time);
      const time = format(date, 'HH:mm');
      hourDiv.classList.add('hourDiv');
      hourDiv.innerHTML = `
        <p>${time}</p>
        <img src="${hour.icon}" alt="${hour.condition}">
        <p>${hour.temp}°</p>
      `;
      this.hourForecast.appendChild(hourDiv);
    });
  }

  setupScrolling() {
    let isDown = false;
    let startX;
    let scrollLeft;

    this.hourForecast.addEventListener('mousedown', (e) => {
      isDown = true;
      this.hourForecast.classList.add('active');
      startX = e.pageX - this.hourForecast.offsetLeft;
      scrollLeft = this.hourForecast.scrollLeft;
      e.preventDefault();
    });

    this.hourForecast.addEventListener('mouseleave', () => {
      isDown = false;
      this.hourForecast.classList.remove('active');
    });

    this.hourForecast.addEventListener('mouseup', () => {
      isDown = false;
      this.hourForecast.classList.remove('active');
    });

    this.hourForecast.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - this.hourForecast.offsetLeft;
      const walk = (x - startX) * 3;
      this.hourForecast.scrollLeft = scrollLeft - walk;
    });
  }
}

export default HourForecast;
