import $ from 'jquery';

class ExpandableCheckboxList {
  constructor(node) {
    this.$list = $(node);
    this.$options = this.$list.find('.checkbox-list__options');

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $list, $options } = this;

    $options.on('click', ExpandableCheckboxList._optionClickHandler);
    $list.on('click', this._toggleClass.bind(this));
  }

  _toggleClass() {
    this.$list.toggleClass('checkbox-list_closed');
  }

  static _optionClickHandler(e) {
    e.stopPropagation();
  }
}

$('.js-checkbox-list_expandable').each((_, node) => {
  const checkbox = new ExpandableCheckboxList(node);

  return checkbox;
});
