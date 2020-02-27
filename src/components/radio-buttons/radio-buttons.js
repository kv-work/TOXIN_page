import './radio-buttons.scss';

class Radio {
  constructor(node) {
    this.$this = $(node)
    this.radioBtns = this.$this.find('.radio_buttons__radio')

    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    const { $this, radioBtns } = this;

    $this.change(function() {
      radioBtns.each(function() {
        if (this.control.checked) {
          this.classList.add('radio_buttons__radio_label_checked')
        } else {
          this.classList.remove('radio_buttons__radio_label_checked')
        }
      })
    })
  }
}

$('.radio_buttons').each(function() {
  const radioButtons = new Radio(this)
})