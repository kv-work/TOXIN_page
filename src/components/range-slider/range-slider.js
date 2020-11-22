import $ from 'jquery';
import 'ion-rangeslider/js/ion.rangeSlider.min';

class Slider {
  constructor(node) {
    this.$this = $(node);
    this.$displayValue = this.$this.find('.range-slider__value');
    this.$slider = this.$this.find('input');
    this.$slider.ionRangeSlider();
    this.sliderData = this.$slider.data('ionRangeSlider');

    Slider.renderVal(this.$slider, this.$displayValue);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $slider } = this;

    $slider.on('change', this._changeEventHandler.bind(this));
  }

  _changeEventHandler(event) {
    const { $displayValue } = this;
    const $slider = $(event.currentTarget);
    Slider.renderVal($slider, $displayValue);
  }

  static renderVal($slider, $display) {
    const dataFrom = $slider.data('from').toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    const dataTo = $slider.data('to').toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    const data = `${dataFrom}₽ - ${dataTo}₽`;
    $display.html(data);
  }
}

$('.js-range-slider').each(function addSlider() {
  const slider = new Slider(this);

  return slider;
});
