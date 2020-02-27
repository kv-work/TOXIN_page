import './checkbox.scss';

class ExpandableCheckboxList {
  constructor(node) {
    this.$list = $(node);
    this.$options = this.$list.find('.checkbox__options');
    
    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    const {$list, $options} = this;

    $options.click( (e) => {
      e.stopPropagation();
    });
    $list.click( function() {
      $(this).toggleClass('form__checkbox_expandable_opened');
    } );
  }
}

$('.form__checkbox_expandable').each(function() {
  const checkbox = new ExpandableCheckboxList(this)
})