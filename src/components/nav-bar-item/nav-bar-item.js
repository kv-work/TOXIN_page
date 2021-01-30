import $ from 'jquery';

class NestedItem {
  constructor(node) {
    this.$nestedItem = $(node);

    this._attachEventHandler();
  }

  _attachEventHandler() {
    const { $nestedItem } = this;

    $nestedItem.on('click.nestedItem', NestedItem.handleNestedItemClick);
  }

  static handleNestedItemClick(e) {
    const { target } = e;

    const $list = $(target).find('.js-nav-bar-item__nested-list');
    $list.toggle();

    setTimeout(() => {
      $(document).on('click.nestedItem', NestedItem.makeClickHandler(target, $list));
    }, 0);
  }

  static makeClickHandler(node, $list) {
    const handleDocumentClick = (e) => {
      if (e.target !== node) {
        $list.hide();
      }

      $(document).off('click.nestedItem', handleDocumentClick);
    };

    return handleDocumentClick;
  }
}

$('.js-nav-bar-item_nested').each(function createNestedItem() {
  const nestedItem = new NestedItem(this);

  return nestedItem;
});
