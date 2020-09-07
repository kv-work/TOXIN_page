import './checkbox.scss';
import $ from 'jquery';

class ExpandableCheckboxList {
  constructor(node) {
    this.$list = $(node);
    this.$options = this.$list.find('.checkbox__options');

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $list, $options } = this;

    $options.click((e) => {
      e.stopPropagation();
    });
    $list.click(function toggleClass() {
      $(this).toggleClass('form__checkbox_expandable_opened');
    });
  }
}

$('.js-form__checkbox_expandable').each((node) => {
  const checkbox = new ExpandableCheckboxList(node);

  return checkbox;
});
