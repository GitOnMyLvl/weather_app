import './style.css';
import APIHandler from './APIHandler';
import SearchForm from './SearchForm';
import WeatherCard from './WeatherCard';

document.addEventListener('DOMContentLoaded', () => {
  const weatherApiHandler = new APIHandler('f37cc2d964724710b6c120551240603');
  const weatherCard = new WeatherCard('app');
  const searchForm = new SearchForm(weatherApiHandler, 'app', weatherCard.updateWeather.bind(weatherCard));
  searchForm.createForm();
});
