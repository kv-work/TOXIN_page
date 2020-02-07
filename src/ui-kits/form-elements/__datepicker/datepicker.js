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
        offset: -52, //отступ от начальной позиции
        onSelect: (_, date) => selectDate(date, startDate, endDate)
      }

    //unnecessary test options
    const altOps = {
      navTitles: {days: 'MM yyyy'},
      clearButton: true,
      inline: true,
      range: true,
      toggleSelected: false
    }

    var startDate = $('.js_datepicker.start_date'),
            endDate = $('.js_datepicker.end_date'),
            filter = $('.js_datepicker_ranged');

    const datePicker = $('.js_datepicker_ranged').datepicker(rangeOpt).data('datepicker')
    
    $('.form_datepicker').click( () => datePicker.show() )

    $('.datepicker .datepicker--buttons').append('<button type="button" class="datepicker--button-apply">Применить</button>')
    

    
  }
)


function selectDate(date, startEl, endEl) {

  switch (date.length) {
    case 1:
      const startDate = date[0].toLocaleDateString();
      $(startEl).val(startDate);
      break;
    case 2:
      const endDate = date[1].toLocaleDateString();
      $(endEl).val(endDate)
      break;
    default:
      $(startEl).val('');
      $(endEl).val('')
      break;
  }
}
