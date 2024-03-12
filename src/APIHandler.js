import { addHours, isWithinInterval, parseISO } from 'date-fns';

class APIHandler {
  constructor(apiKey, displayError) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
    this.displayError = displayError;
  }

  async callApi(location) {
    const url = `${this.baseUrl}?key=${this.apiKey}&q=${location}&days=3&aqi=no`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return APIHandler.processWeatherData(data);
    } catch (error) {
      this.displayError(error);
      return null;
    }
  }

  static processWeatherData(data) {
    const processedData = {
      country: data.location.country,
      city: data.location.name,
      localtime: data.location.localtime,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      icon: `https:${data.current.condition.icon}`,
      feelsLike: data.current.feelslike_c,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      windDir: data.current.wind_dir,
      forecastDays: {},
      forecastHours: [],
    };

    data.forecast.forecastday.forEach((day, index) => {
      processedData.forecastDays[index] = {
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: `https:${day.day.condition.icon}`,
      };
    });

    const next23Hours = addHours(data.location.localtime, 23);

    data.forecast.forecastday.forEach((day) => {
      day.hour.forEach((hour) => {
        const hourTime = parseISO(hour.time);
        if (isWithinInterval(hourTime, { start: data.location.localtime, end: next23Hours })) {
          processedData.forecastHours.push({
            time: hour.time,
            temp: hour.temp_c,
            condition: hour.condition.text,
            icon: `https:${hour.condition.icon}`,
          });
        }
      });
    });

    return processedData;
  }
}

export default APIHandler;
