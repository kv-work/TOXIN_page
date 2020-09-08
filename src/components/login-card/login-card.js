import './login-card.scss';
import $ from 'jquery';

class LoginCard {
  constructor(node) {
    this.$form = $(node);

    this._init();
  }

  _init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $form } = this;

    $form.on('submit', this._submitForm.bind(this));
  }

  async _submitForm(event) {
    event.preventDefault();

    const { $form } = this;

    const formData = new FormData($form[0]);
    const url = $form[0].action;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Не удалость отправить данные по адресу ${url}. Статус: ${response.status}`);
    } else {
      // const json = await response.json();
    }
  }
}

$('.js-login_card').each((_, node) => {
  const loginCard = new LoginCard(node);

  return loginCard;
});
