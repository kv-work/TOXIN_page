import './rate-button.scss';
import $ from 'jquery';

export default class RateButton {
  constructor(node) {
    this.$node = $(node);

    this.$buttons = this.$node.find('input');

    this._init();
  }

  _init() {
    const initRate = this.$node.data('rate');

    this.setRate(initRate);
  }

  setRate(rate) {
    const { $buttons } = this;
    const idxOfBtn = rate - 1;

    $buttons.eq(idxOfBtn).prop('checked', true);
    $buttons.eq(idxOfBtn).change();
  }
}
