class AlertBox {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.alertBox = null;
    this.timeout = null;
  }

  showAlert(message, duration = 3000) {
    if (!this.alertBox) {
      this.alertBox = document.createElement('div');
      this.alertBox.id = 'alertBox';
      this.alertBox.classList.add('alertBox', 'hidden');
      this.container.appendChild(this.alertBox);
    }

    this.alertBox.innerHTML = `
      <p>${message}</p>
    `;
    this.alertBox.classList.remove('hidden');

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.hideAlert();
    }, duration);
  }

  hideAlert() {
    if (this.alertBox) {
      this.alertBox.classList.add('hidden');
    }
  }
}

export default AlertBox;
