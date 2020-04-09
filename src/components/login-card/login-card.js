import './login-card.scss';

class LoginCard {
  constructor(node) {
    this.$form = $(node);

    this._init()
  }

  _init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $form } = this;

    $form.submit( e => this._submitForm(e) )
  }

  async _submitForm(event) {
    event.preventDefault()

    const {$form} = this;

    const formData = new FormData($form[0])
    const url = $form[0].action;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      // throw new Error(`Не удалость отправить данные по адресу ${url}. Статус: ${response.status}`)
      console.log(`Не удалость отправить данные по адресу ${url}. Статус: ${response.status}`)
    } else {
      // Получаем ответ
      return await response.json()
    }

  }
}

$('.login_card').each(function() {
  new LoginCard(this)
})