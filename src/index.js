import './style.css';
import APIHandler from './APIHandler';

document.addEventListener('DOMContentLoaded', () => {
  const weatherApiHandler = new APIHandler('f37cc2d964724710b6c120551240603');

  weatherApiHandler.callApi('Vienna').then((data) => {
    console.log(data);
  });
});
