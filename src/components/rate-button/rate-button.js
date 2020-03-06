import './rate-button.scss'

class RateButton {
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

// export default function renderRateButtons(callbackFunc) {
//   $( () => {
//     const rateButtons = $('.js_rate_button').map((idx, node) => {
//       return new RateButton(node);
//     })

//     if (callbackFunc && typeof callbackFunc === 'function') {
//       callbackFunc(rateButtons)
//     }
//   })
// }

// renderRateButtons()

export { RateButton };