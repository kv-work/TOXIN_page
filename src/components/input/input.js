import $ from 'jquery';
import Cleave from 'cleave.js';

$(document).ready(() => {
  $('.js-form_input__input_masked').each((_, field) => {
    const input = new Cleave(field, {
      date: true,
      datePattern: ['d', 'm', 'Y'],
      delimiters: ['.', '.'],
    });

    return input;
  });
});
