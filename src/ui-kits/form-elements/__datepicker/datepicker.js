import 'air-datepicker/dist/js/datepicker.min'

$(document).ready( () => {

    const rangeOpt = {
      range: true,
      toggleSelected: false,
      multipleDatesSeparator: " - ",
      clearButton: true
    }
    
    $('.js_datepicker_ranged').datepicker(rangeOpt)
    $('.js_datepicker').datepicker()
  }
)
