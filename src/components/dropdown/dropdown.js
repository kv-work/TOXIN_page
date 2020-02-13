import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(() => {

  const options = {

    initialText: "Сколько гостей",
    selectionText: "гость",
    textPlural: "гостя",
    moreThenFiveText: "гостей",
    controls: {
      controlBtnsCls: 'iqdropdown-menu-control-buttons',
      clearBtn: true,
      clearBtnLabel: 'Очистить',
      applyBtn: true,
      applyBtnLabel: 'Применить',
    },


    onChange: function (id, count, totalItems) {
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
    
    },
    onApply: () => {}
  }

  $('.js_form_dropdown').iqDropdown(options)

})