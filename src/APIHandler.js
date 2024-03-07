class APIHandler {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'http://api.weatherapi.com/v1/current.json';
  }

  async callApi(location) {
    const url = `${this.baseUrl}?key=${this.apiKey}&q=${location}&aqi=no`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return APIHandler.processWeatherData(data);
    } catch (error) {
      return error;
    }
  }

  static processWeatherData(data) {
    return {
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
    };
  }
}

export default APIHandler;
