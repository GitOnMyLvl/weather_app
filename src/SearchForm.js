class SearchForm {
  constructor(apiHandler, containerId, displayData, displayError) {
    this.apiHandler = apiHandler;
    this.container = document.getElementById(containerId);
    this.displayData = displayData;
    this.displayError = displayError;
  }

  createForm() {
    this.form = document.createElement('form');
    this.form.id = 'locationForm';
    this.form.classList.add('locationForm');

    this.inputWrapper = document.createElement('div');
    this.inputWrapper.id = 'inputWrapper';
    this.inputWrapper.classList.add('inputWrapper');

    this.input = document.createElement('input');
    this.input.id = 'locationInput';
    this.input.classList.add('locationInput');
    this.input.type = 'text';
    this.input.placeholder = 'Enter location';
    this.input.autocomplete = 'off';
    this.input.required = true;

    this.suggestionField = document.createElement('div');
    this.suggestionField.id = 'suggestionField';
    this.suggestionField.classList.add('suggestionField');

    this.submit = document.createElement('button');
    this.submit.id = 'locationSubmit';
    this.submit.classList.add('locationSubmit');
    this.submit.type = 'submit';
    this.submit.textContent = 'Search';

    this.inputWrapper.appendChild(this.input);
    this.inputWrapper.appendChild(this.suggestionField);
    this.form.appendChild(this.inputWrapper);
    this.form.appendChild(this.submit);
    this.container.appendChild(this.form);

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.input.addEventListener('input', this.handleInput.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const location = this.input.value;
    try {
      const data = await this.apiHandler.callApi(location);
      if (SearchForm.isValidData(data)) {
        this.displayData(data);
      }
    } catch (error) {
      this.displayError(error);
    }
  }

  async handleInput(event) {
    event.preventDefault();
    const query = this.input.value;
    if (query.length > 3) {
      try {
        const suggestions = await this.apiHandler.fetchSuggestions(query);
        this.displaySuggestions(suggestions);
      } catch (error) {
        this.displayError(error);
      }
    }
  }

  displaySuggestions(suggestions) {
    this.suggestionField.innerHTML = '';

    // function to remove duplicate suggestions
    const uniqueSuggestions = suggestions.reduce((acc, suggestion) => {
      if (!acc[suggestion.name]) {
        acc[suggestion.name] = suggestion;
      }
      return acc;
    }, {});

    Object.values(uniqueSuggestions).forEach((suggestion) => {
      const suggestionDiv = document.createElement('div');
      suggestionDiv.classList.add('suggestion');
      suggestionDiv.textContent = suggestion.name;
      suggestionDiv.addEventListener('click', () => {
        this.input.value = suggestion.name;
        this.suggestionField.innerHTML = '';
      });
      this.suggestionField.appendChild(suggestionDiv);
    });
  }

  static isValidData(data) {
    const hasBasicProperties = data && typeof data === 'object' && 'city' in data && 'country' in data && 'temp' in data;
    const hasForecastDays = data.forecastDays && typeof data.forecastDays === 'object' && [0, 1, 2].every((key) => key in data.forecastDays);
    const hasForecastHours = Array.isArray(data.forecastHours) && data.forecastHours.length > 0;
    return hasBasicProperties && hasForecastDays && hasForecastHours;
  }
}

export default SearchForm;
