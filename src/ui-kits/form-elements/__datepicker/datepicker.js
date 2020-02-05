import 'air-datepicker/dist/js/datepicker.min'

$(document).ready( () => {

    const options = {
      range: false,
      toggleSelected: false,
      multipleDatesSeparator: " - ",
      clearButton: true  
    }
    
    $('.js_datepicker').datepicker(options)
  }
)
