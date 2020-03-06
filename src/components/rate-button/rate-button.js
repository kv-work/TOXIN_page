import './rate-button.scss'

class RateButton {
  constructor(node) {
    this.$node = $(node);
    this.data = this.$node.data();

    this.$buttons = this.$node.find('input');

    // console.log(this.$buttons)
    this._init()
  }

  _init() {
    const initRate = this.data.rate;
    // this.setRate(initRate)
  }

  setRate(rate) {
    const {$buttons} = this;

    console.log($buttons.eq(rate))
    console.log(rate)

    $buttons.eq(rate--).change()
  }
}

$('.js_rate_button').each(function() {
  const rateButton = new RateButton(this);
})