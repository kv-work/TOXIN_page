import 'ion-rangeslider/js/ion.rangeSlider.min'
import 'ion-rangeslider/css/ion.rangeSlider.min.css'

class Slider {
  constructor(node) {
    this.$this = $(node)
    this.$displayValue = this.$this.find('.range_slider__value')
    this.$slider = this.$this.find('input')
    this.$slider.ionRangeSlider()
    this.sliderData = this.$slider.data('ionRangeSlider')

    this._renderVal(this.$slider, this.$displayValue)
    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    const { $slider, $displayValue, _renderVal} = this;

    $slider.on('change', function() {
      const $slider = $(this);
      _renderVal($slider, $displayValue)
    })
  }

  _renderVal($slider, $display) {
    
    const dataFrom = $slider.data('from').toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + '₽';
    const dataTo = $slider.data('to').toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + '₽';
    const data = dataFrom + ' - ' + dataTo;
    $display.html(data)
  }

}

$('.js_range_slider').each(function() {
  const slider = new Slider(this)
})