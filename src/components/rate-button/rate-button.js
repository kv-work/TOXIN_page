import './rate-button.scss'

export default class RateButton {
  constructor(node) {
    this.$node = $(node);
    this.data = this.$node.data();

    this.$buttons = this.$node.find('input');

    this._init()
  }

  _init() {
    const initRate = this.data.rate;

    this.setRate(initRate)
  }

  setRate(rate) {
    const {$buttons} = this;
    const idxOfBtn = --rate;

    $buttons.eq(idxOfBtn).prop('checked', true)
    $buttons.eq(idxOfBtn).change()
  }
}