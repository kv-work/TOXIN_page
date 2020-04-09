import './registration-card.scss'

class RegistrationCard {
  constructor(node) {
    this.$form = $(node)

    this._init()
  }

  _init() {
    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    const {$form} = this;

    $form.submit( e => this._submitForm(e) )
  }

  _submitForm(event) {
    event.preventDefault()

    const {$form} = this;

    const formData = new FormData($form)
    const url = $form.action;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Не удалость отправить данные по адресу ${url}. Статус: ${response.status}`)
    }
    // Получаем ответ
    return await response.json()
  }
}

$('.registration_card').each(function() {
  new RegistrationCard(this)
})