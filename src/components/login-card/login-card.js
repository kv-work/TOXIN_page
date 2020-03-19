import './login-card.scss';

class LoginCard {
  constructor(node) {
    this.$node = $(node);

    this._init()
  }

  _init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $node } = this;

    $node.submit( e => this._submitForm(e) )
  }

  _submitForm(event) {
    event.preventDefault()

    console.log('login-card form submit')
  }
}

$('.login_card').each(function() {
  new LoginCard(this)
})