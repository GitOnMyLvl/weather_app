import './style.css';
import APIHandler from './APIHandler';
import SearchForm from './SearchForm';

document.addEventListener('DOMContentLoaded', () => {
  const weatherApiHandler = new APIHandler('f37cc2d964724710b6c120551240603');

  const searchForm = new SearchForm(weatherApiHandler, 'app');
  searchForm.createForm();
});
