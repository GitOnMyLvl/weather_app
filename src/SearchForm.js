class SearchForm {
  constructor(apiHandler, containerId) {
    this.apiHandler = apiHandler;
    this.container = document.getElementById(containerId);
  }

  createForm() {
    // Create form
    this.form = document.createElement('form');
    this.form.id = 'locationForm';
    // Create input
    this.input = document.createElement('input');
    this.input.id = 'locationInput';
    this.input.type = 'text';
    this.input.placeholder = 'Enter location';
    this.input.required = true;
    // Create submit button
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default SearchForm;
