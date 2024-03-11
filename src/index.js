import './style.css';
import APIHandler from './APIHandler';
import SearchForm from './SearchForm';
import WeatherCard from './WeatherCard';
import HourForecast from './HourForecast';

document.addEventListener('DOMContentLoaded', () => {
  const weatherApiHandler = new APIHandler('f37cc2d964724710b6c120551240603');
  const weatherCard = new WeatherCard('app');
  const hourForecast = new HourForecast('app');
  const searchForm = new SearchForm(weatherApiHandler, 'app', hourForecast.updateHourForecast.bind(hourForecast));
  searchForm.createForm();
});
