import 'cleave.js';
import Datepicker from './datepicker_class';

//Add a mask to enter the date
$('.js_datepicker_masked').toArray().forEach(function (field) {
  new Cleave(field, {
    date: true,
    datePattern: ['d', 'm', 'Y'],
    delimiters: ['.', '.']
  });
})

//Set initial value  
$('.js_datepicker_masked').toArray().forEach(function (field) {
  const inputValue = $(field).attr('date')
  $(field).val(inputValue)
})

const datepickerBlock = $('.form_datepickerblock').each(function () {

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

  const rangeOpt = {
    language: 'my-lang',
    range: true,
    toggleSelected: false,
    multipleDatesSeparator: " - ",
    dateFormat: 'd M',
    clearButton: true,
    navTitles: {
      days: 'MM yyyy'
    },
    minDate: new Date(),
    offset: -52, //отступ от начальной позиции  
  }

  const datepicker = new Datepicker(this, rangeOpt);
  
  return datepicker;
})