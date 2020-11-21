import $ from 'jquery';
import Cleave from 'cleave.js';

$('.js-input__input_masked').each((_, field) => {
  const input = new Cleave(field, {
    date: true,
    datePattern: ['d', 'm', 'Y'],
    delimiters: ['.', '.'],
  });

  return input;
});
