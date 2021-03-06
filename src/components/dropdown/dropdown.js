import $ from 'jquery';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min';

// Creating dropdown
$('.js-dropdown').iqDropdown({
  maxItems: 10,
  initialText: 'Сколько гостей',
  selectionText: 'гость',
  textPlural: 'гостя',
  moreThenFiveText: 'гостей',
  controls: {
    controlBtnsCls: 'iqdropdown-menu-control-buttons',
    clearBtn: true,
    clearBtnLabel: 'Очистить',
    applyBtn: true,
    applyBtnLabel: 'Применить',
  },
  setCustomMessage(itemCount) {
    const infants = itemCount['item-3'];
    const guests = itemCount['item-1'] + itemCount['item-2'];
    let message = guests;

    if (guests === 0) {
      message = this.initialText;
    } else if (guests === 1) {
      message += ` ${this.selectionText}`;
    } else if (guests < 5) {
      message += ` ${this.textPlural}`;
    } else if (guests >= 5) {
      message += ` ${this.moreThenFiveText}`;
    }

    if (infants === 1) {
      message = (guests === 0) ? '1 младенец' : `${message}, 1 младенец`;
    } else if (infants > 1 && infants < 5) {
      message = (guests === 0) ? `${infants} младенца` : `${message}, ${infants} младенца`;
    } else if (infants >= 5) {
      message = (guests === 0) ? `${infants} младенцев` : `${message}, ${infants} младенцев`;
    }

    return message;
  },
  onApply: () => {},
});

// Creating multiple-dropdown
$('.js-dropdown_multiple').iqDropdown({
  initialText: 'Выберите удобства',
  controls: {
    controlBtnsCls: 'iqdropdown-menu-control-buttons',
    clearBtn: false,
    applyBtn: false,
  },
  beforeIncrement: (id, itemCount) => itemCount[id] < 4,
  setCustomMessage(itemCount, totalItems, itemLabels) {
    if (totalItems === 0) return this.initialText;
    let selectionText = '';

    const keysArr = Object.keys(itemCount);
    keysArr.forEach((key) => {
      if (itemCount[key] > 0) {
        if (selectionText.length === 0) {
          selectionText += `${itemCount[key]} ${itemLabels[key]}`;
        } else {
          selectionText += `, ${itemCount[key]} ${itemLabels[key]}`;
        }
      }
    });

    return selectionText.toLowerCase();
  },
});
