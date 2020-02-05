import 'cleave.js'

const options = {
  date: true,
  datePattern: ['d', 'm', 'Y'],
  delimiters: ['.','.']
};
const cleave = new Cleave('.form_input_masked .form_input__input', options)