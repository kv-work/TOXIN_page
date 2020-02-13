import 'cleave.js'

$(document).ready( () => {

  $('.form_input_masked .form_input__input').toArray().forEach(function(field){
    new Cleave(field, {
      date: true,
      datePattern: ['d', 'm', 'Y'],
      delimiters: ['.','.']
    });
  })

})
