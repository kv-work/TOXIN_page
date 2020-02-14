import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$('.js_form_dropdown').iqDropdown( {

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
  onChange: function (id, count, totalItems) {},
  setCustomMessage(itemCount, totalItems) {
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
} )

$('.js_form_dropdown_multiple').iqDropdown( {

  initialText: "Выберите удобства",
  controls: {
    controlBtnsCls: 'iqdropdown-menu-control-buttons',
    clearBtn: false,
    applyBtn: false,
  },
  onChange: function (id, count, totalItems) {},
  beforeIncrement: (id, itemCount) => itemCount[id] < 4,
  setCustomMessage(itemCount, totalItems) {
    if (totalItems == 0) return this.initialText;
    let selectionText = '';
    
    for (let key in itemCount) {
      if (itemCount[key] > 0) {
        selectionText += itemCount[key] + " " + key;
      }
    }

    return selectionText;
  },
} )