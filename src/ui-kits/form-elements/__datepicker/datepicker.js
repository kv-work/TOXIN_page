import 'air-datepicker/dist/js/datepicker.min'
import 'cleave.js'

$(document).ready( () => {

  $('.js_datepicker_masked').toArray().forEach(function(field){
    new Cleave(field, {
      date: true,
      datePattern: ['d', 'm', 'Y'],
      delimiters: ['.','.']
    });
  })

  //Set initial value
  
  $('.js_datepicker_masked').toArray().forEach(function(field){
    const inputValue = $(field).attr('date')
    $(field).val(inputValue)
  })

  $.fn.datepicker.language['my-lang'] = {
    days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
    daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthsShort: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'],
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
      clearButton: true
    }

  // const startDate = $('.js_datepicker'),
  //         endDate   = $('.js_datepicker')[1];

  const datePicker = $('.js_datepicker_ranged').datepicker(rangeOpt).data('datepicker')

  // $('.js_datepicker').click( (e) => {
    
  //   e.preventDefault();

  //   datePickerData.show()
  //   })
  }
)
