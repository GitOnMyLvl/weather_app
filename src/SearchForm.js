class SearchForm {
  constructor(apiHandler, containerId, displayData) {
    this.apiHandler = apiHandler;
    this.container = document.getElementById(containerId);
    this.displayData = displayData;
  }

  createForm() {
    this.form = document.createElement('form');
    this.form.id = 'locationForm';
  
    this.input = document.createElement('input');
    this.input.id = 'locationInput';
    this.input.type = 'text';
    this.input.placeholder = 'Enter location';
    this.input.required = true;

    this.submit = document.createElement('button');
    this.submit.id = 'locationSubmit';
    this.submit.type = 'submit';
    this.submit.textContent = 'Search';

    this.form.appendChild(this.input);
    this.form.appendChild(this.submit);
    this.container.appendChild(this.form);

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const location = this.input.value;
    try {
      const data = await this.apiHandler.callApi(location);
      this.displayData(data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default SearchForm;
