import $ from 'jquery';

class Radio {
  constructor(node) {
    this.$this = $(node);

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $this } = this;

    $this.on('change.radio', this._handleRadioChange);
  }

  _handleRadioChange(event) {
    const $currentTarget = $(event.currentTarget);
    const $radioBtns = $currentTarget.find('.js-radio-buttons__radio');
    $radioBtns.each(function addCheckedClass() {
      if (this.control.checked) {
        this.classList.add('radio-buttons__radio-label_checked');
      } else {
        this.classList.remove('radio-buttons__radio-label_checked');
      }
    });
  }
}

$('.js-radio-buttons').each(function addRadioBtns() {
  const radioButtons = new Radio(this);

  return radioButtons;
});
