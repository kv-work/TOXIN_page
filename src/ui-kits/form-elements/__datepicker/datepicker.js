import 'air-datepicker/dist/js/datepicker.min'
import 'cleave.js'

$(document).ready( () => {

    //Add a mask to enter the date
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

    //config datepicker's language
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

    //Options
    const rangeOpt = {
        language: 'my-lang',
        range: true,
        toggleSelected: false,
        multipleDatesSeparator: " - ",
        dateFormat: 'd M',
        clearButton: true,
        navTitles: {days: 'MM yyyy'},
        minDate: new Date(),
        offset: -52, //отступ от начальной позиции
        onSelect: (_, date) => selectDate(date, startDate, endDate),
        onHide: (inst) => selectDate(inst.selectedDates, startDate, endDate)
      }

    var startDate = $('.js_datepicker.start_date'),
            endDate = $('.js_datepicker.end_date');

    const datePicker = $('.js_datepicker_ranged').datepicker(rangeOpt).data('datepicker')

    //added apply button to datepicker
    $('.datepicker .datepicker--buttons').append('<button type="button" class="datepicker--button-apply">Применить</button>') 

    //clear input for click
    $('.js_datepicker').click( (e) => e.target.value = '')
    //show datepicker
    $('.form_datepicker').click( (e) => showCalendar(e, datePicker) )
    //hide datepicker
    $('.datepicker--button-apply').click( (e) => hideCalendar(e, datePicker) )
    //input date from start or end el's
    $('.js_datepicker').change( (e) => setDate(e.target.value, e.target, datePicker) )

  }
)


function selectDate(date, startEl, endEl) {

  let startDate, endDate;

  switch (date.length) {
    case 1:
      startDate = date[0].toLocaleDateString();
      if (startEl) $(startEl).val(startDate);
      break;
    case 2:
      endDate = date[1].toLocaleDateString();
      startDate = date[0].toLocaleDateString();
      if (startEl) $(startEl).val(startDate);
      if (endEl) $(endEl).val(endDate)      
      break;
    default:
      $(startEl).val('');
      $(endEl).val('')
      break;
  }
  
}

function showCalendar(event, calendar) {

  calendar.show()
}

function hideCalendar(event, calendar) {

  calendar.hide()
}

function setDate(date, input, calendar) {

  const dateString = date.split('.').reverse().join('-');
  let startDate, endDate;

  if ( input.classList.contains('start_date') ) {

    startDate = new Date(dateString)
    endDate = calendar.selectedDates[1] ? calendar.selectedDates[1] : startDate

  } else if ( input.classList.contains('end_date') ) {

    endDate = new Date(dateString)
    startDate = calendar.selectedDates[0] ? calendar.selectedDates[0] : new Date()
  }

  const dateArr = [startDate, endDate]    
  calendar.selectDate(dateArr)

}