import './style.css';
import APIHandler from './APIHandler';
import SearchForm from './SearchForm';
import WeatherCard from './WeatherCard';
import DaysForecast from './DayForecast';
import HourForecast from './HourForecast';
import AlertBox from './AlertBox';

document.addEventListener('DOMContentLoaded', () => {
  const alertBox = new AlertBox('app');

  const weatherCard = new WeatherCard('app');
  const daysForecast = new DaysForecast('app');
  const hourForecast = new HourForecast('app');

  const displayError = () => {
    const message = "Couldn't fetch data";
    alertBox.showAlert(message);
  };

  const weatherApiHandler = new APIHandler('f37cc2d964724710b6c120551240603', displayError);

  const updateAllModules = (data) => {
    weatherCard.updateWeather(data);
    hourForecast.updateHourForecast(data);
    daysForecast.updateDayForecast(data);
  };

  const searchForm = new SearchForm(weatherApiHandler, 'app', updateAllModules, displayError);
  searchForm.createForm();
  weatherApiHandler.callApi('Vienna').then((data) => updateAllModules(data));
});
