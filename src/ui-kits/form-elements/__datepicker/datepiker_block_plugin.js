import {
  selectDate,
  showCalendar,
  hideCalendar,
  setDate
} from './datepicker_block_functions';

(function ($) {

  $.fn.datepickerBlock = function (options) {

    this.each(function () {

      const startDate = $(this).find('.js_datepicker.start_date')[0];
      const endDate = $(this).find('.js_datepicker.end_date')[0];

      const settings = {
        ...options,
        onSelect: (_, date) => selectDate(date, startDate, endDate),
        onHide: (inst) => selectDate(inst.selectedDates, startDate, endDate)
      }
      const datePicker = $(this).find('.js_datepicker_ranged').datepicker(settings).data('datepicker')

      //clear input for click
      $(this).find('.js_datepicker').focus((e) => e.target.value = "")

      //show datepicker
      $(this).find('.form_datepicker').click((e) => showCalendar(e, datePicker))

      //input date from start or end el's
      $(this).find('.js_datepicker').change((e) => setDate(e.target.value, e.target, datePicker))


    })

    return this

  }



}(jQuery))
