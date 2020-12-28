import $ from 'jquery';
import Datepicker from './Datepicker';

// config datepicker's language
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
  firstDay: 1,
};

const options = {
  language: 'my-lang',
  range: true,
  toggleSelected: false,
  multipleDatesSeparator: ' - ',
  dateFormat: 'd M',
  clearButton: true,
  offset: 15,
  navTitles: {
    days: 'MM yyyy',
  },
};

$('.js-datepicker-block').each(function addDatepicker() {
  const datepicker = new Datepicker(this, options);

  return datepicker;
});
