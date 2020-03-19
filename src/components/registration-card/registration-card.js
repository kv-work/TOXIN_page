import './registration-card.scss'

class RegistrationCard {
  constructor(node) {
    this.$node = $(node)

    this._init()
  }

  _init() {
    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    const {$node} = this;

    $node.submit( e => this._submitForm(e) )
  }

  _submitForm(event) {
    event.preventDefault()

    console.log('registration-card form submit')
  }
}

$('.registration_card').each(function() {
  new RegistrationCard(this)
})