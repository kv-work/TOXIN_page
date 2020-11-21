import $ from 'jquery';

class NestedItem {
  constructor(node) {
    this.$nestedItem = $(node);

    this._attachEventHandler();
  }

  _attachEventHandler() {
    const { $nestedItem } = this;

    $nestedItem.on('click', NestedItem.clickHandler.bind(this));
  }

  static clickHandler(e) {
    const { target } = e;

    $(target).find('ul').toggle();

    setTimeout(() => {
      $(document).on('click', NestedItem.makeNewClickHandler(target));
    }, 0);
  }

  static makeNewClickHandler(node) {
    const newClickHandler = (e) => {
      if (e.target !== node) {
        $(node).find('ul').hide();
      }

      $(document).off('click', newClickHandler);
    };

    return newClickHandler;
  }
}

$('.js-nav-bar-item_nested').each(function createNestedItem() {
  const nestedItem = new NestedItem(this);

  return nestedItem;
});
