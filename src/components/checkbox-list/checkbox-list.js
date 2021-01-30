import $ from 'jquery';

class ExpandableCheckboxList {
  constructor(node) {
    this.$list = $(node);
    this.$options = this.$list.find('.js-checkbox-list__options');

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $list, $options } = this;

    $options.on('click.checkboxList', this._handleOptionClick);
    $list.on('click.checkboxList', this._handleListClick.bind(this));
  }

  _handleListClick() {
    this.$list.toggleClass('checkbox-list_closed');
  }

  // eslint-disable-next-line class-methods-use-this
  _handleOptionClick(e) {
    e.stopPropagation();
  }
}

$('.js-checkbox-list_expandable').each((_, node) => {
  const checkbox = new ExpandableCheckboxList(node);

  return checkbox;
});
