import { selectDate,
  showCalendar,
  hideCalendar,
  setDate} from './datepicker_block_functions';

(function ($) {


  $.fn.datepickerBlock = function (options) {

    const settings = {
      ...options,
      onSelect: (_, date) => selectDate(date, startDate, endDate),
      onHide: (inst) => selectDate(inst.selectedDates, startDate, endDate)
    }

    const startDate = this.find('.js_datepicker.start_date'),
      endDate = this.find('.js_datepicker.end_date');

    const datePicker = this.find('.js_datepicker_ranged').datepicker(settings).data('datepicker')

    //added apply button to datepicker
    $('.datepicker .datepicker--buttons').append('<button type="button" class="datepicker--button-apply">Применить</button>')

    //clear input for click
    $('.js_datepicker').click((e) => e.target.value = '')
    //show datepicker
    $('.form_datepicker').click((e) => showCalendar(e, datePicker))
    //hide datepicker
    $('.datepicker--button-apply').click((e) => hideCalendar(e, datePicker))
    //input date from start or end el's
    $('.js_datepicker').change((e) => setDate(e.target.value, e.target, datePicker))

    
  }

})(jQuery)