
// Подождем реализации кастомного сообщения в p.iqdropdown-selection
// Если не будет обновления библиотеке: сделать fork и роеализовать необходимые функции самому
// Подключить fork к проекту

import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(() => {

  const options = {

    initialText: "Сколько гостей",
    selectionText: "гость",
    textPlural: "гостя",
    moreThenFiveText: "гостей",


    onChange: function (id, count, totalItems) {
    },
    beforeDecrement: function (id, itemCount) {
      return true;
    },
    beforeIncrement: function (id, itemCount) {
      return true;
    },
    setSelectionText (itemCount, totalItems) {

      if (totalItems == 0) {
        return this.initialText
      }

      if (totalItems == 1) {
        return `1 ${this.selectionText}`
      }

      if (totalItems < 5) {
        return `${totalItems} ${this.textPlural}`
      }

      if (totalItems >= 5) {
        return `${totalItems} ${this.moreThenFiveText}`
      }
    
    }
  }

  $('.js_form_dropdown').iqDropdown(options)

})