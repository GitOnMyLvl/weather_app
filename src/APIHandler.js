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
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default APIHandler;
