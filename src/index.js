import './style.css';
import APIHandler from './APIHandler';
import SearchForm from './SearchForm';
import WeatherCard from './WeatherCard';
import DaysForecast from './DayForecast';
import HourForecast from './HourForecast';

document.addEventListener('DOMContentLoaded', () => {
  const weatherApiHandler = new APIHandler('f37cc2d964724710b6c120551240603');
  const weatherCard = new WeatherCard('app');
  const daysForecast = new DaysForecast('app');
  const hourForecast = new HourForecast('app');

  const updateAllModules = (data) => {
    weatherCard.updateWeather(data);
    daysForecast.updateDayForecast(data);
    hourForecast.updateHourForecast(data);
  };

  const searchForm = new SearchForm(weatherApiHandler, 'app', updateAllModules);
  searchForm.createForm();
  weatherApiHandler.callApi('London').then((data) => updateAllModules(data));
});
