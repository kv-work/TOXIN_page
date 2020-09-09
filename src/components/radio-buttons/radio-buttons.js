import './radio-buttons.scss';
import $ from 'jquery';

class Radio {
  constructor(node) {
    this.$this = $(node);

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $this } = this;

    $this.on('change', Radio.changeEventHandler);
  }

  static changeEventHandler(event) {
    const $currentTarget = $(event.currentTarget);
    const $radioBtns = $currentTarget.find('.radio_buttons__radio');
    $radioBtns.each(function addCheckedClass() {
      if (this.control.checked) {
        this.classList.add('radio_buttons__radio_label_checked');
      } else {
        this.classList.remove('radio_buttons__radio_label_checked');
      }
    });
  }
}

$('.js-radio_buttons').each(function addRadioBtns() {
  const radioButtons = new Radio(this);

  return radioButtons;
});
