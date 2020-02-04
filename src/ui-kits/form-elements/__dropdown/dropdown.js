import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(() => {

  const options = {

    onChange: function (id, count, totalItems) {
      console.log(id, count, totalItems);
      const selectionMod = $.find('p.iqdropdown-selection_modified')
      console.log(selectionMod)

    },
    beforeDecrement: function (id, itemCount) {
      return true;
    },
    beforeIncrement: function (id, itemCount) {
      return true;
    }
  }

  const defaults = {
    maxItems: 4,
    minItems: 0,
    selectionText: 'гость',
    textPlural: 'гостя',
    controls: {
      position: 'right',
      displayCls: 'iqdropdown-content',
      controlsCls: 'iqdropdown-item-controls',
      counterCls: 'counter',
    },
    items: {},
    onChange: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true,
  };

  $('.js_form_dropdown').iqDropdown(defaults)

})