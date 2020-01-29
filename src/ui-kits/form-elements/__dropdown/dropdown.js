import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready( () => {

	const newOptions = {
		// max total items
		maxItems: Infinity,
		// min total items
		minItems: 0,
		// text to show on the dropdown
		selectionText: 'item',
		// text to show for multiple items
		textPlural: 'items',
		// buttons to increment/decrement
		controls: {
			position: 'right',
			displayCls: 'iqdropdown-item-display',
			controlsCls: 'iqdropdown-item-controls',
			counterCls: 'counter'
		},
		// fires when an item quantity changes
		onChange: (id, count, totalItems) => {},
		// return false to prevent an item decrement
		beforeDecrement: (id, itemCount) => {},
		// return false to prevent an item increment
		beforeIncrement: (id, itemCount) => {}
	}

	const options = {
		minItems: 1,
    maxItems: 5,
    selectionText: "2 спальни, 2 кровати",
    textPlural: "passengers",
    onChange: function(id, count, totalItems) {
      console.log(id, count, totalItems);
    },
    beforeDecrement: function(id, itemCount) {
      if (id === "adult") {
    	  return itemCount.adult > itemCount.infant;
			}
			return true;
		},
		beforeIncrement: function(id, itemCount) {
			if (id === "infant") {
				return itemCount.adult > itemCount.infant;
			}
			return true;
		}
	}

	$('.iqdropdown').iqDropdown(options)
	
} )