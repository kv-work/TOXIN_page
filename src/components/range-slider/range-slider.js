import 'ion-rangeslider/js/ion.rangeSlider.min'
import 'ion-rangeslider/css/ion.rangeSlider.min.css'

$(".js_range_slider").ionRangeSlider({
  type: "double",
  min: 0,
  max: 15000,
  from: 5000,
  to: 10000,
  postfix: "₽"
});