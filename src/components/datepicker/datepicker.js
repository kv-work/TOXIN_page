import 'air-datepicker/dist/js/datepicker.min';
import 'cleave.js';
import Datepicker from './datepicker_class';
import './datepicker.scss';

const datepickerBlocks = $('.js_form_datepicker, .js_form_datepicker_separated').each(function () {
  //config datepicker's language
  $.fn.datepicker.language['my-lang'] = {
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    today: 'Сегодня',
    clear: 'Очистить',
    dateFormat: 'dd.mm.yyyy',
    timeFormat: 'hh:ii',
    firstDay: 1
  }

  const options = {
    language: 'my-lang',
    range: true,
    toggleSelected: false,
    multipleDatesSeparator: " - ",
    dateFormat: 'd M',
    clearButton: true,
    minDate: new Date('2019-08-19'),
    navTitles: {
      days: 'MM yyyy'
    }
  }

  const datepicker = new Datepicker(this, options);

  return datepicker;
})

//Set initial value  
$('.js_datepicker_masked').toArray().forEach(function (field) {
  const inputValue = $(field).attr('data-date')
  $(field).val(inputValue)
})

//Add a mask to enter the date
$('.js_datepicker_masked').toArray().forEach(function (field) {
  new Cleave(field, {
    date: true,
    datePattern: ['d', 'm', 'Y'],
    delimiters: ['.', '.']
  });
})